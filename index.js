const solver = () => {//Set block

    const getBlockNumber = (row, col) => {
        let block = "";
        row < 3
            ? col < 3
                ? block = 1
                : col < 6
                    ? block = 2
                    : block = 3
            : row < 6
                ? col < 3
                    ? block = 4
                    : col < 6
                        ? block = 5
                        : block = 6
                : col < 3
                    ? block = 7
                    : col < 6
                        ? block = 8
                        : block = 9
        return block;
    }

    const createHash = (sudoku) => {
        const map = {};
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = sudoku[row][col];
                if (value === ".") continue;
                if (map[value]) {
                    map[value]["rows"][row] = true;
                    map[value]["cols"][col] = true;
                    map[value]["blocks"][getBlockNumber(row, col)] = true;
                } else {
                    map[value] = {
                        rows: {},
                        cols: {},
                        blocks: {}
                    }
                    map[value]["rows"][row] = true;
                    map[value]["cols"][col] = true;
                    map[value]["blocks"][getBlockNumber(row, col)] = true;
                }
            }
        }
        return map;
    }

    const canNumberBePlaced = (col, row, num, map) => {
        let inRow = map[num]["rows"][row];    //does number already exist in this row
        let inCol = map[num]["cols"][col];    //does number already exist in this col
        let inBlock = map[num]["blocks"][getBlockNumber(row, col)]; //does number already exist in this block
        return (!inRow && !inCol && !inBlock); //number can be placed when all are false.
    }

    const checkSurroundings = (col, row, num, map) => {
        let rowEnd, colEnd;
        let openings = 0;

        row < 3 ? rowEnd = 3 : row < 6 ? rowEnd = 6 : rowEnd = 9; //set max for row loop
        col < 3 ? colEnd = 3 : col < 6 ? colEnd = 6 : colEnd = 9; //set max for col loop

        for (let i = rowEnd - 3; i < rowEnd; i++) {
            for (let j = colEnd - 3; j < colEnd; j++) {
                const currentFieldValue = sudoku[i][j];

                if (i === row && j === col) continue;
                if (currentFieldValue !== ".") continue;

                const canBePlaced = canNumberBePlaced(j, i, num, map);
                if (canBePlaced) openings++

            }
        }

        return openings === 0;
    }
    const map = createHash(sudoku);

    for (let row = 0; row < 9; row++) { //loop through row
        for (let col = 0; col < 9; col++) { //loop through column
            const currentFieldValue = sudoku[row][col];  //current field in sudoku
            if (currentFieldValue !== ".") continue; //if a number exist in field move to next column
            for (let i = 1; i < 10; i++) {  //checking numbers 1-9 one at a time
                if (!map[i]) continue;   //if not in map at all, move to next number
                const canBePlaced = canNumberBePlaced(col, row, i, map);  //true means number can be placed here
                if (!canBePlaced) continue;
                const numberBelongs = checkSurroundings(col, row, i, map);   //true means number can ONLY be placed here.

                if (canBePlaced && numberBelongs) {
                    sudoku[row].splice(col, 1, i);
                    return solver(sudoku);
                }
            }
        }
    }
    return sudoku;
}

const sudoku = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]

const solvedSudoku = solver(sudoku);
console.table(solvedSudoku);

let rowCheck = false
solvedSudoku.forEach((row) => {
    for (let i = 1; i < 10; i++) {
        rowCheck = (row.includes(i) || row.includes(String(i)));
    }

})
console.log({ rowCheck });

let colCheck = false;

for (let col = 0; col < 9; col++) {
    solvedSudoku.forEach((row) => {
        for (let i = 1; i < 10; i++) {
            colCheck = Number(row[col]) === i;
        }
    })
}

console.log({ colCheck });

    //solution
    // ["5", "3", 4, 6, "7", 8, 9, 1, 2],
    // ["6", 7, 2, "1", "9", "5", 3, 4, 8],
    // [1, "9", "8", 3, 4, 2, 5, "6", 7],

    // ["8", 5, 9, 7, "6", 1, 4, 2, "3"],
    // ["4", 2, 6, "8", 5, "3", 7, 9, "1"],
    // ["7", 1, 3, 9, "2", 4, 8, 5, "6"],

    // [9, "6", 1, 5, 3, 7, "2", "8", 4],
    // [2, 8, 7, "4", "1", "9", 6, 3, "5"],
    // [3, 4, 5, 2, "8", 6, 1, "7", "9"]

//Hashmap sample
const numbers = {
    1: {
        rows: {
            1: true,
            3: true
        },
        cols: {
            1: true,
            3: true
        },
        blocks: {
            1: true,
            3: true
        },
    }
}