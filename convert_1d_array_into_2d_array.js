const construct2DArray = function (original, m, n) {
    if (m === 0 || n === 0 || original.length === 0) {
        return [];
    }

    const epsilon = 0.000001;
    const actualColNumber = original.length / m;

    if (Math.abs(actualColNumber - n) > epsilon) {
        return [];
    }

    function* generateRows() {
        for (let i = 0; i < m; i++) {
            yield original.slice(i * n, (i + 1) * n);
        }
    }

    return [...generateRows()];
};

console.log(construct2DArray([1, 2, 3, 4], 3, 2))
console.log(construct2DArray([1, 2, 3], 3, 2))
console.log(construct2DArray([1, 2, 3, 4], 2, 2))