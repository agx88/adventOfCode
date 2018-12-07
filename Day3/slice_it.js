'use strict'
const fs = require('fs');

const parse = row => {
    const [ id, left, top, width, height ] = row
      .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)
      .slice(1, 6)
      .map(Number)
  
    return { id, left, top, width, height }
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
const computeOverlapArea = input => {
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
        let parsed = parse(row);
        let indexes = getIndexes(parsed);
        let i = 0;
        for (i; i < indexes.length && !(hmap[indexes[i]] == 'X'); i++);
        if (i == indexes.length) {
            return parsed.id; //id of the row
        }
    }
}

fs.readFile(__dirname + `/input.txt`, (err, data) => {
    console.log(computeNonOverlapId(data.toString().split('\n')));
})
