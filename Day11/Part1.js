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
const flip = (current) =>
	Array.from({ length: current[0].length }, (_, x) =>
		Array.from({ length: current.length }, (_, y) => current[y][x])
	);

const universe = flip(expand(flip(expand(input))));
console.log(universe);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
