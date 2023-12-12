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
const galaxies = universe
	.map((a, y) => a.map((b, x) => ({ s: b, x, y })).filter((b) => b.s === "#"))
	.filter((e) => e.length > 0)
	.reduce((a, i) => [...a, ...i], []);
const distances = galaxies.map((c, i) =>
	galaxies.reduce(
		(a, n, j) => a + (j > i ? Math.abs(c.x - n.x + c.y - n.y) : 0),
		0
	)
);
const sum = distances.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
