import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt").toString().split(/\r*\n/);
const time = input[0]
	.split(/\s{1,}/)
	.slice(1)
	.map(Number);
const distance = input[1]
	.split(/\s{1,}/)
	.slice(1)
	.map(Number);
const records = time
	.map(
		(a, i) =>
			[...Array(a - 1).keys()]
				.map((b) => (a - (b + 1)) * (b + 1))
				.filter((b) => b > distance[i]).length
	)
	.reduce((a, i) => a * i);
console.log(records);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
