import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt").toString().split("\n");
const time = input[0]
	.split(/\s{1,}/)
	.slice(1)
	.map(Number);
const distance = input[1]
	.split(/\s{1,}/)
	.slice(1)
	.map(Number);
console.log(time, distance);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
