const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

// --- Cookie helpers ---
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        c = c.trim();
        if (c.startsWith(name + '=')) {
            return decodeURIComponent(c.substring(name.length + 1));
        }
    }
    return null;
}

// --- Todo storage ---
function getTodos() {
    const raw = getCookie('todos');
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function saveTodos(todos) {
    setCookie('todos', JSON.stringify(todos), 365);
}

// --- DOM rendering ---
function createTodoElement(text) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;

    div.addEventListener('click', () => {
        const confirmDelete = confirm('Remove this to-do item?');
        if (confirmDelete) {
            const index = Array.from(ftList.children).indexOf(div);
            div.remove();

            const todos = getTodos();
            todos.splice(index, 1);
            saveTodos(todos);
        }
    });

    return div;
}

function addTodoToTop(text, save = true) {
    const el = createTodoElement(text);
    ftList.insertBefore(el, ftList.firstChild);

    if (save) {
        const todos = getTodos();
        todos.unshift(text);
        saveTodos(todos);
    }
}

// --- New button ---
newBtn.addEventListener('click', () => {
    const text = prompt('Enter a new to-do:');
    if (text !== null && text.trim() !== '') {
        addTodoToTop(text.trim());
    }
});

// --- Load todos on page load ---
window.addEventListener('DOMContentLoaded', () => {
    const todos = getTodos();
    todos.forEach(text => {
        addTodoToTop(text, false);
    });
});