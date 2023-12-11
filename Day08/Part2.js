import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0);
const instructions = input[0].split("");
const maps = input.slice(1).map((a) => {
	const [name, pair] = a.split(" = ");
	const mapping = pair.match(/^\(([A-Z]{3}), ([A-Z]{3})\)$/);
	const [_, L, R] = mapping;
	return { name, mapping: { L, R } };
});
const cycles = maps
	.filter((e) => e.name.endsWith("A"))
	.map((e) => {
		let count = 0,
			index = 0;
		let current = e;
		while (!current.name.endsWith("Z")) {
			const direction = instructions[index];
			const mapping = current.mapping[direction];

			current = maps.find((a) => a.name === mapping);
			index = (index + 1) % instructions.length;
			count++;
		}
		return { start: e, end: current, length: count };
	});
const sizes = cycles.map((e) => e.length);
const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const total = sizes.reduce(lcm, 1);
console.log(total);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
