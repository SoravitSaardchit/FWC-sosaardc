const balloon = document.getElementById('balloon');
let size = 200;
let colorIndex = 0;
const colors = ['red', 'green', 'blue'];

function updateBalloon() {
    balloon.style.width = size + 'px';
    balloon.style.height = size + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}

balloon.addEventListener('click', () => {
    size += 10;
    colorIndex = (colorIndex + 1) % 3;

    if (size > 420) {
        size = 200;
    }

    updateBalloon();
});

balloon.addEventListener('mouseleave', () => {
    if (size > 200) {
        size -= 5;
    }
    colorIndex = (colorIndex - 1 + 3) % 3;

    updateBalloon();
});