import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt").toString().split(/\r*\n/);
const time = parseInt(
	input[0]
		.split(/\s{1,}/)
		.slice(1)
		.reduce((a, i) => a + i)
);
const distance = parseInt(
	input[1]
		.split(/\s{1,}/)
		.slice(1)
		.reduce((a, i) => a + i)
);
console.log(
	[...Array(time - 1).keys()]
		.map((b) => (time - (b + 1)) * (b + 1))
		.filter((b) => b > distance).length
);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
