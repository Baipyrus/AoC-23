import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
	.toString()
	.split("\n")
	.filter((e) => e.length > 0);
const histories = input.map((e) => e.split(" ").map(Number));
const sequences = [];
let current = histories[0];
while (!current.every((e) => e === 0)) {
	sequences.push(current);
	current = current.reduce((a, n, i) => {
		if (i === 0) return a;
		const d = n - current[i - 1];
		const t = a;
		t.push(d);
		return t;
	}, []);
}
console.log(sequences);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
