'use strict'
const fs = require('fs');
// PART 1
const parse = row => {
    let leftop = row.split("@")[1].split(":")[0].split(",");
    let wh = row.split("@")[1].split(":")[1].split("x")
    return {
        left: Number(leftop[0]),
        top: Number(leftop[1]),
        width: Number(wh[0]),
        height: Number(wh[1])
    }
}

const getIndexes = coords => {
    let indexes = [];
    for (let i = coords.left; i < coords.width + coords.left; i++) {
        for (let j = coords.top; j < coords.height + coords.top; j++) {
            indexes.push([i, j])
        }
    }
    return indexes;
}

// PART 1
// const computeOverlapArea = input => {
//     let sum = 0;
//     let hmap = {};
//     input.forEach(row => {
//         let indexes = getIndexes(parse(row));
//         indexes.forEach(pair => {
//             if (hmap[pair]) {
//                 if (hmap[pair] == 1) {
//                     hmap[pair] = 'X';
//                     sum++;
//                 }
//             }
//             else hmap[pair] = 1;
//         })
//     })
//     return sum;
// }

// PART 2
const computeNonOverlapId = input => {
    //Build
    let hmap = {};
    input.forEach(row => {
        let indexes = getIndexes(parse(row));
        indexes.forEach(pair => {
            if (hmap[pair]) {
                if (hmap[pair] == 1) {
                    hmap[pair] = 'X';
                }
            }
            else hmap[pair] = 1;
        })
    })

    for (let row of input) {
        let indexes = getIndexes(parse(row));
        let i = 0;
        for (i; i < indexes.length; i++) {
            if (hmap[indexes[i]] == 'X') {
                break;
            }
        }
        if (i == indexes.length) {
            return row.split('@')[0].split('#')[1]; //id of the row
        }
    }
}

// console.log(computeNonOverlapId([
//     "#1 @ 1,3: 4x4",
//     "#2 @ 3,1: 4x4",
//     "#3 @ 5,5: 2x2"
// ]))

fs.readFile(__dirname + `/input.txt`, (err, data) => {
    console.log(computeNonOverlapId(data.toString().split('\n')));
})
