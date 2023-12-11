import { readFileSync } from "fs";
const t0 = performance.now();

const lines = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0);
const numbers = lines.map((a) =>
	a
		.split("")
		.filter((b) => parseInt(b))
		.join("")
);
const combinations = numbers.map((e) => parseInt(e[0] + e[e.length - 1]));
const sum = combinations.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
