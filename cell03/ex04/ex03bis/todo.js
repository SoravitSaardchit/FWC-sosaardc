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

function createTodoElement(text) {
    const $div = $('<div class="todo-item"></div>').text(text);

    $div.on('click', function() {
        const confirmDelete = confirm('Remove this to-do item?');
        if (confirmDelete) {
            const index = $('#ft_list .todo-item').index($div);
            $div.remove();

            const todos = getTodos();
            todos.splice(index, 1);
            saveTodos(todos);
        }
    });

    return $div;
}

function addTodoToTop(text, save = true) {
    const $el = createTodoElement(text);
    $('#ft_list').prepend($el);

    if (save) {
        const todos = getTodos();
        todos.unshift(text);
        saveTodos(todos);
    }
}

$('#newBtn').on('click', function() {
    const text = prompt('Enter a new to-do:');
    if (text !== null && text.trim() !== '') {
        addTodoToTop(text.trim());
    }
});

$(document).ready(function() {
    const todos = getTodos();
    todos.forEach(text => addTodoToTop(text, false));
});