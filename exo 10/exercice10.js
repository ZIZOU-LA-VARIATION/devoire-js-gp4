function sortNumber(tinit, tinf, tsup) {
    for (let i = 0; i < tinit.length; i++) {
        if (tinit[i] < 10) {
            tinf.push(tinit[i]);
        } else {
            tsup.push(tinit[i]);
        }
    }
}

let tinit = [3, 15, 7, 25, 9, 11, 4, 20,100,2.5];
let tinf = [];
let tsup = [];

sortNumber(tinit, tinf, tsup);

console.log(tinf); 
console.log(tsup); 
