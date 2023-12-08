import { readFileSync } from "fs";
const t0 = performance.now();

const lines = readFileSync("input.txt")
	.toString()
	.split("\n")
	.filter((e) => e.length > 0);
const cards = lines.map((line) => {
	const id = parseInt(line.match(/^Card\s{1,}(\d{1,3}):/)[1]);
	const left = line
		.match(/:\s*((?:\s*\d{1,2})+)\s*\|/)[1]
		.split(/\s{1,}/)
		.map((num) => parseInt(num));
	const right = line
		.match(/\|\s*((?:\s*\d{1,2})+)\s*$/)[1]
		.split(/\s{1,}/)
		.map((e) => parseInt(e));
	const matches = right.filter((a) => left.some((b) => a === b));
	return { id, left, right, matches };
});
const points = cards.map((e) =>
	e.matches.length > 0 ? 2 ** (e.matches.length - 1) : 0
);
const sum = points.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
