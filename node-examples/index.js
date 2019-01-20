var rect = {
    perimeter: (x, y) => (2 * (x + y)),
    area: (x, y) => (x * y)
};

function solveRect(l, b) {
    console.log('Solving for rectangle for l=' + l + ' and b=' + b);

    if (l <= 0 || b <= 0) {
        console.log('Rectangle dimensions are not valid');
    } else {
        console.log('The area of the the rectangle is: ' + rect.area(l, b));
        console.log('The perimeter of the rectangle is: ' + rect.perimeter(l, b));
    }
}

solveRect(1, 2);
solveRect(2, 1);
solveRect(-1, 5);
solveRect(1, 0);
