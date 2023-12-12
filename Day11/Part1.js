import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0)
	.map((e) => e.split(""));

const expand = (arr) =>
	arr.reduce(
		(a, i) => [
			...a,
			...(i.some((e) => e !== ".") ? [i] : [i, Array(i.length).fill(".")]),
		],
		[]
	);

console.log(expand(input));

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
