import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0);
const histories = input.map((e) => e.split(" ").map(Number));
const predictions = histories.map((e) => {
	let current = e;
	const sequences = [];
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
	const last = sequences.pop();
	let extrapolated = [...last, last[0]];
	for (const s of sequences.reverse()) {
		const current = s.pop();
		const last = extrapolated.pop();
		extrapolated = [...s, current + last];
	}
	return extrapolated.pop();
});
const sum = predictions.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
