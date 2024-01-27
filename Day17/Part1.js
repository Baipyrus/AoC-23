import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
    .toString()
    .split(/\r*\n/)
    .filter((e) => e.length > 0)
    .map((a, j) => a
        .split("")
        .map((b, i) => ({
            c: +b,
            x: i,
            y: j,
            d: 0,
            h: 0
        })));
console.log(input[0].slice(-1)[0]);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
