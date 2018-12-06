const fs = require('fs')

// PART 1
const countOccurr = (word) => {
    const hashMap = {}
    word.split('').map(char => {
        if(hashMap[char]){
            hashMap[char] += 1;
        } else {
            hashMap[char] = 1;
        }
    })
    return hashMap;
}


const checksum = ids => {
    let twos = 0;
    let threes = 0;
    ids.forEach(word => {
        map = countOccurr(word);
        if (Object.keys(map).filter(key => map[key] == 2).length >= 1) twos++;
        if (Object.keys(map).filter(key => map[key] == 3).length >= 1) threes++; 
    })
    return twos * threes;
} 

// fs.readFile(`${process.cwd()}/Day2/input.txt`, (err, data) => {
//     if (err) console.log(err);
//     else console.log(checksum(data.toString().split('\n')));
// });


// PART 2 
// pre: s1, s2 same length
const diffIndex = (s1, s2) => {
    let index = -1;
    let ctr = 0;
    for(let i = 0; i < s1.length; i++){
        if(s1.charAt(i) != s2.charAt(i)) {
            index = i;
            ctr++;
        }
    }
    return ctr == 1 ? index : -1;
} 

const findPair = arr => {
    for(let i = 0; i < arr.length; i++){
        for(j = i + 1; j < arr.length; j++){
            let index = diffIndex(arr[i], arr[j]);
            if(index != -1) return arr[i].slice(0, index) + arr[i].slice(index + 1, arr[i].length); 
        }
    }
}

fs.readFile(__dirname + `/input.txt`, (err, data) => {
    if (err) console.log(err);
    else console.log(findPair(data.toString().split('\n')));
});