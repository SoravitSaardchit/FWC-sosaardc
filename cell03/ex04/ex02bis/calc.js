function isPositiveInteger(value) {
    return /^\d+$/.test(value);
}

$('#calcForm').on('submit', function(e) {
    e.preventDefault();

    const leftValue = $('#left').val();
    const rightValue = $('#right').val();
    const operator = $('#operator').val();

    if (!isPositiveInteger(leftValue) || !isPositiveInteger(rightValue)) {
        alert('Error :(');
        return;
    }

    const left = parseInt(leftValue, 10);
    const right = parseInt(rightValue, 10);

    if ((operator === '/' || operator === '%') && right === 0) {
        alert("It's over 9000!");
        return;
    }

    let result;
    switch (operator) {
        case '+': result = left + right; break;
        case '-': result = left - right; break;
        case '*': result = left * right; break;
        case '/': result = left / right; break;
        case '%': result = left % right; break;
    }

    console.log(result);
    alert(result);
});

setInterval(function() {
    alert('Please, use me...');
}, 30000);