import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0)
	.map((a, j) => a.split("").map((b, i) => ({ s: b, x: i, y: j })));

const expand = (arr) => {
	let expansion = 0;
	return arr.map((a) => {
		const c = !a.some((b) => b.s !== ".");
		if (c) expansion += 999999;
		return a.map((b) => {
			const { s, x, y } = b;
			return { s, x, y: y + expansion };
		});
	});
};
const flip = (current) =>
	Array.from({ length: current[0].length }, (_, cx) =>
		Array.from({ length: current.length }, (_, cy) => {
			const { s, x, y } = current[cy][cx];
			return { s, x: y, y: x };
		})
	);

const universe = flip(expand(flip(expand(input))));
const galaxies = universe
	.map((a) => a.filter((b) => b.s === "#"))
	.filter((e) => e.length > 0)
	.reduce((a, i) => [...a, ...i], []);
const distances = galaxies.map((c, i) =>
	galaxies.reduce(
		(a, n, j) => a + (j > i ? Math.abs(c.x - n.x) + Math.abs(c.y - n.y) : 0),
		0
	)
);
const sum = distances.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
