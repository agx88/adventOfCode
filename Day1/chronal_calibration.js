const fs = require('fs')

// PART 1
const computeFreq = numbers => {
    return numbers.reduce((sum, curr) => {
        return sum += Number(curr);
    }, 0);
}

// PART 2
const computeFreqTwice = input => {
    const hashMap = { 0: true };
    let sum = 0;
    while (true) {
        for (let item of input) {
            sum += Number(item);
            if (hashMap[sum]) {
                return sum;
            } else {
                hashMap[sum] = true;
            }
        }
    }
}

fs.readFile('./freq.txt', (err, data) => {
    console.log(computeFreqTwice(data.toString().split('\n')));
})

// console.log(computeFreqTwice(["+3", "+3", "+4", "-2", "-4"]))