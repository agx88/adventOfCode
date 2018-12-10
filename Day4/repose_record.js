'use strict'

const fs = require('fs');

//PART 1
// order input by date
const file = fs.readFileSync(__dirname + '/input.txt');
const sorted = file.toString().split('\n').sort();

// parse data entry
const parseEntry = row => {
    let ID = null;
    const entry = row.split(' ');
    const mm = Number(entry[1].split(':')[1].slice(0, 2));
    const event = entry[2];
    if (entry[3].indexOf('#') != -1) {
        ID = entry[3].slice(1);
    }
    return { id: ID, mm: mm, event: event }
}

// for each entry, mark the hours in record...
const markHours = input => {
    let record = {};
    let temp_id = null;
    let temp_sleep;
    input.forEach(row => {
        let data = parseEntry(row);
        if (data.id != null) {
            temp_id = data.id;
        }
        if (data.event == 'falls') {
            temp_sleep = data.mm;
        }
        if (data.event == 'wakes') {
            for (let i = temp_sleep; i < data.mm; i++) {
                if (record[temp_id]) {
                    if (record[temp_id][i] != null) {
                        record[temp_id][i] += 1;
                    } else {
                        record[temp_id][i] = 1;
                    }
                } else {
                    record[temp_id] = { [i]: 1 };
                }
            }
        }
    });
    return record;
}

//... and mark total amount of hours
// compare with the current maximum number (keep temp maximum number and temp corresponding ID)
const computeTotal = record => {
    let sums = {};
    let t_max_id = 0;
    let t_max_sum = 0;
    Object.keys(record).forEach(id => {
        Object.keys(record[id]).forEach(mm => {
            if(sums[id]){
                sums[id] += record[id][mm];
            } else {
                sums[id] = record[id][mm];
            }
        });
        if(sums[id] > t_max_sum){
            t_max_sum = sums[id];
            t_max_id = id;
        }
    })
    return t_max_id;
}

// compute the most "sleeped" minute for the ID
const getSleepyMinute = minutes => {
    let minute = -1;
    let max = 0;
    Object.keys(minutes).forEach(mm => {
        if(minutes[mm] > max){
            max = minutes[mm]
            minute = mm;
        }
    });
    return minute;
}
// END of PART 1
const record = markHours(sorted);
const sleepyId = computeTotal(record);
const sleepyMinute = getSleepyMinute(record[sleepyId]);
const code1 = sleepyId * sleepyMinute;

// console.log(code);

//PART 2
const mostSleepyMinute = record => {
    let max = 0;
    let max_id = -1;
    let minute = -1;
    Object.keys(record).forEach(id => {
        Object.keys(record[id]).forEach(mm => {
            if(record[id][mm] > max){
                max = record[id][mm];
                max_id = id;
                minute = mm; 
            }
        })
    })
    return [max_id, minute]
}

//END of PART 2
const mostSleepyOnMinute = mostSleepyMinute(record);
const code2 = mostSleepyOnMinute[0] * mostSleepyOnMinute[1];

console.log(code2);