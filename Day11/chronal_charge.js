//PART 1
const SERIAL = 9005;
const ROWS = 300;
const COLS = 300;
const SUB_RANGE = 3;

//util: get hundredth digit
const getHundredth = number => {
    return ((number - number % 100) / 100) % 10;
}

//compute the power level of a cell
const getCellPower = (row, col) => {
    const id = row + 10;
    return getHundredth(((id * col) + SERIAL) * id) - 5;
}

//compute the power levels of the grid (build the grid)
const getGridPower = (rows, cols) => {
    let grid = {};
    for (let i = 1; i <= rows; i++) {
        grid[i] = {};
        for (let j = 1; j <= cols; j++) {
            grid[i][j] = getCellPower(i, j);
        }
    }
    return grid;
}

// sum values on a sub matrix of SUB_RANGE x SUB_RANGE (matrix is an object)
const sumSubMatrix = (grid, row, col, range) => {
    let sum = 0;
    for (let i = row; i < row + range && i <= ROWS; i++) {
        for (let j = col; j < col + range && j <= COLS; j++) {
            sum += grid[i][j];
        }
    }
    return sum;
}

//find the most powerful 3x3 square
//the problem is HEREEEEE!!! --> found it -.- implicit cast
const getMostPowerful = grid => {
    let max_sum = 0;
    let coords = [0, 0];
    Object.keys(grid).forEach(row => {
        Object.keys(grid[row]).forEach(col => {
            let t_sum = sumSubMatrix(grid, Number(row), Number(col), SUB_RANGE);
            if (t_sum > max_sum) {
                max_sum = t_sum;
                coords = [row, col];
                console.log(`row: ${row} col: ${col} sum: ${t_sum}`);
                console.log(`max: ${max_sum} coords: ${[row, col]}`);
            }
        })
    })
    return coords;
}

const getMostPowerfulVarying = grid => {
    let max_sum = 0;
    let coords = [0, 0];
    Object.keys(grid).forEach(row => {
        Object.keys(grid[row]).forEach(col => {
            for(let range = SUB_RANGE; range <= ROWS; range++){
                let t_sum = sumSubMatrix(grid, Number(row), Number(col), range);
                if (t_sum > max_sum) {
                    max_sum = t_sum;
                    coords = [row, col, range];
                    console.log(`row: ${row} col: ${col} sum: ${t_sum}`);
                    console.log(`max: ${max_sum} coords: ${[row, col, range]}`);
                }
            }
        })
    })
    return coords;
}

const input = getGridPower(ROWS, COLS);
// console.log(getMostPowerful(input))
console.log(getMostPowerfulVarying(input));