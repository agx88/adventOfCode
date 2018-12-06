'use strict'
const fs = require('fs');

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

const computeOverlaps = input => {
    let sum = 0;
    let hmap = {};
    input.forEach(row => {
        let indexes = getIndexes(parse(row));
        indexes.forEach(pair => {
            if (hmap[pair]) {
                if (hmap[pair] == 1) {
                    hmap[pair] = 'X';
                    sum++;
                }
            }
            else hmap[pair] = 1;
        })
    })
    return sum;
}

fs.readFile( __dirname + `/input.txt`, (err, data) => {
    console.log(computeOverlaps(data.toString().split('\n')));
})