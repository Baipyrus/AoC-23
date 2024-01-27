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
            g: 0,
            h: 0,
        })));
const man_dist = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

const start = input[0][0];
const end = input.slice(-1)[0].slice(-1)[0];
const open = [start], closed = [];

console.log(end.g);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
