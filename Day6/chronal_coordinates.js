// PART 1
//parse the input: collect the points
const fs = require('fs');
const file = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');
const getPoints = input => {
    let points = [];
    input.forEach(pair => {
        let point = pair.split(',');
        points.push([Number(point[0]), Number(point[1])]);
    })
    return points;
}

const points = getPoints(file);

//find the bottom corner: point with highest y
const getXBottomCorner = points => {
    let max = points[0][0];
    for (let point of points) {
        if (point[0] > max) {
            max = point[0];
        }
    }
    return max;
}

const getYBottomCorner = points => {
    let max = points[0][1];
    for (let point of points) {
        if (point[1] > max) {
            max = point[1];
        }
    }
    return max;
}


//compute the manhattan distance for each point --> if is less than the current one, swap "property"
const manhattan = (p1, p2) => {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

const BORDER_X = getXBottomCorner(points);
const BORDER_Y = getYBottomCorner(points);
//for test
// const BORDER_X = 8;
// const BORDER_Y = 9;

//count the distance of each check point and return the maximum area
const computeAreas = points => {
    let areas = {};
    for (let i = 0; i <= BORDER_X; i++) {
        for (let j = 0; j <= BORDER_Y; j++) {
            let min = 10000000;
            for (point of points) {
                let dist = manhattan(point, [i, j]);
                if (dist < min) {
                    min = dist;
                    areas[[i, j]] = point;
                }
                else if (dist == min) {
                    areas[[i, j]] = '.';
                }
            }
        }
    }
    return areas;
}

const getSums = areas => {
    let sums = {};
    let blacklist = new Set();
    Object.keys(areas).forEach(point => {
        let x = Number(point.split(',')[0]);
        let y = Number(point.split(',')[1]);
        if (sums[areas[point]]) {
            sums[areas[point]] += 1;
        } else if (areas[point] != '.') {
            sums[areas[point]] = 1;
        }
        if (x == BORDER_X || x == 0 || y == BORDER_Y || y == 0) {
            blacklist.add(areas[point].toString());
        }
    });
    Object.keys(sums).forEach(point => {
        if (blacklist.has(point.toString())) {
            delete sums[point];
        };
    })
    return sums;
}

const getMaxSum = sums => {
    let max = 0;
    Object.keys(sums).forEach(point => {
        if (sums[point] > max) {
            max = sums[point];
        }
    });
    return max;
}

// const test = fs.readFileSync(__dirname + '/test.txt').toString().split('\n');
// console.log(getMaxSum(getSums(computeAreas(points))));


//PART 2
const LIMIT = 10000;

const computeRegion = points => {
    let total = 0;
    for (let i = 0; i <= BORDER_X; i++) {
        for (let j = 0; j <= BORDER_Y; j++) {
            let distance = 0;
            for(point of points){
                distance += manhattan([i,j],point)
            }
            if(distance < LIMIT) total++;
        }
    }
    return total;
}
// console.log(computeRegion([[1,1],[1,6],[8,3],[3,4],[5,5],[8,9]]));
console.log(computeRegion(points))