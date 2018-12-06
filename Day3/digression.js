'use strict'

const computeCorners = (left, top, range) => {
    return {
        top_left: {
            x: left,
            y: -top
        },
        bot_right: {
            x: left + range - 1,
            y: -(top + range - 1)
        }
    }
}


const overlap = (a1, a2) => {
    console.log(a1);
    console.log(a2);
    if(a1.top_left.x > a2.bot_right.x || a2.top_left.x > a1.bot_right.x) return 0;
    if(a1.top_left.y < a2.bot_right.y || a2.top_left.y < a1.bot_right.y) return 0;
    console.log(a1.bot_right.y, a2.bot_right.y , a1.top_left.y, a2.top_left.y);
    return (
        Math.abs(Math.min(a1.bot_right.x, a2.bot_right.x) - Math.max(a1.top_left.x, a2.top_left.x)) *
        Math.abs(Math.min(a1.bot_right.y, a2.bot_right.y) - Math.max(a1.top_left.y, a2.top_left.y))
    );
}

console.log(overlap(
    computeCorners(1,3,4),
    computeCorners(3,1,4))
);