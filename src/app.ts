const principal = 1000000;
const interest = 10.25 / 100;
const interestInterval = 12;
const period = 20;

const i = interest / interestInterval;
const n = interestInterval * period;

const a = i * Math.pow(1 + i, n);
const b = Math.pow(1 + i, n) - 1;

const amount = principal * a / b;

console.log(amount);
