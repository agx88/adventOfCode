const fs = require('fs');

// PART 1
// check if char is uppercase
const isUpper = char => {
    return char === char.toUpperCase();
}
// check if char is lowercase
const isLower = char => {
    return char === char.toLowerCase();
}
// check if "units" are opposite
const areOpposite = (u1, u2) => {
    return u1.toLowerCase() == u2.toLowerCase()
        ? (isLower(u1) && isUpper(u2)) || (isUpper(u1) && isLower(u2))
        : false;
}
// reduce the string
const reducePolymer = polymer => {
    for (let i = 0; i < polymer.length - 1; i++) {
        if (areOpposite(polymer.charAt(i), polymer.charAt(i + 1))) {
            polymer = polymer.slice(0, i) + polymer.slice(i + 2);
            i -= 2;
        }
    }
    return polymer;
}

// PART 2
const removeUnit = (polymer, unit) => {
    for (let i = 0; i < polymer.length; i++) {
        if (polymer.charAt(i) == unit.toLowerCase() || polymer.charAt(i) == unit.toUpperCase()) {
            polymer = polymer.slice(0, i) + polymer.slice(i + 1);
            i--;
        }
    }
    return polymer;
}

const optimalReduce = polymer => {
    const alfa = 'abcdefghijklmnopqrstuvwxyz';
    let min = polymer.length;
    for (let i = 0; i < alfa.length; i++) {
        let temp = removeUnit(polymer, alfa.charAt(i));
        temp = reducePolymer(temp);
        if (temp.length < min) {
            min = temp.length;
        }
    }
    return min;
}


const file = fs.readFileSync(__dirname + '/input.txt');

// console.log(reducePolymer(file.toString()).length);
console.log(optimalReduce(file.toString()));