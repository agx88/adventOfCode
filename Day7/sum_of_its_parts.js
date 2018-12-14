const fs = require('fs');

const flatten = arr => {
    return arr.reduce((res, char) => res += char);
}

const parseRules = input => {
    let rules = [];
    for (row of input) {
        let terms = row.split(' ');
        rules.push([terms[1], terms[7]]);
    }
    return rules;
}

const buildPlans = rules => {
    let plans = {};
    for (rule of rules) {
        if (plans[rule[1]]) plans[rule[1]].push(rule[0]);
        else plans[rule[1]] = [rule[0]];
        if (plans[rule[0]] == null) plans[rule[0]] = [];
    }
    return plans;
}

const deleteDependency = (plans, dep) => {
    Object.keys(plans).forEach(key => {
        if (plans[key].includes(dep)) {
            plans[key].splice(plans[key].indexOf(dep), 1);
        }
    });
    return plans;
}

const buildFinalPlan = plans => {
    let final = [];
    while (Object.keys(plans).length > 0) {
        let temp = [];
        Object.keys(plans).forEach(step => {
            if (plans[step].length == 0) {
                temp.push(step);
            }
        });
        if (temp.length > 0) {
            temp.sort();
            final.push(temp[0]);
            deleteDependency(plans, temp[0]);
            delete plans[temp[0]];
        }
    }
    return final;
}

const input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');
let rules = parseRules(input);

const test = fs.readFileSync(__dirname + '/test.txt').toString().split('\n');
let test_rules = parseRules(test);

//PART 1
// const plans = buildPlans(rules);
// console.log(flatten(buildFinalPlan(plans)));

//PART 2
//considering the 60 seconds offset
const BASE_TIME = 60;

const toTime = char => {
    return char.charCodeAt(0) - 64 + BASE_TIME;
}

const cut = (arr, n) => {
    return [arr.slice(0, n), arr.slice(n, arr.length)];
}

const includesTask = (arr, task) => {
    for (el of arr) {
        if (task[0] == el[0])
            return true;
    }
    return false
}

const insert = (arr, step) => {
    let el = [step, toTime(step)];
    if (!includesTask(arr, el)) arr.push(el);
}

const decreaseTime = arr => {
    for (task of arr) {
        task[1]--;
    }
}

const completed = arr => {
    let completed = [];
    for (task of arr) {
        if (task[1] == 0) completed.push(task);
    }
    return completed;
}

const remove = (arr, step) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == step[0]) arr.splice(i, 1);
    }
}

//change perspective --> create tasks and decrease time
const getTotalTime = (plans) => {
    const n = 5;
    let time = 0;
    let ready = [];
    let running = [];
    while (Object.keys(plans).length > 0) {
        Object.keys(plans).forEach(step => {
            if (plans[step].length == 0) {
                if (!includesTask(running, step)) insert(ready, step);
            }
        });
        ready.sort();
        if (running.length < n) {
            for (let i = running.length; i < n; i++) {
                if (ready.length > 0) {
                    if (!includesTask(running, ready[0])) {
                        running.push(ready[0]);
                        ready.splice(0, 1);
                    }
                }
            }
        }
        time += 1;
        decreaseTime(running);
        console.log('running: ', running, 'ready :', ready, 'time: ', time);
        let comp_tasks = completed(running);
        if (comp_tasks) {
            for (comp_task of comp_tasks) {    //remove completed task from temp
                remove(running, comp_task);
                //remove completed task from the plans
                deleteDependency(plans, comp_task[0]);
                delete plans[comp_task[0]];
                if (running.length < n) {
                    for (let i = running.length; i < n; i++) {
                        if (ready.length > 0) {
                            if (!includesTask(running, ready[0])) {
                                running.push(ready[0]);
                                ready.splice(0, 1);
                            }
                        }
                    }
                }
            }
        }
    }
    return time;
}

console.log(getTotalTime(buildPlans(rules)));

