import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
	.toString()
	.split("\n")
	.filter((e) => e.length > 0);
const instructions = input[0].split("");
const maps = input.slice(1).map((a) => {
	const [name, pair] = a.split(" = ");
	const mapping = pair.match(/^\(([A-Z]{3}), ([A-Z]{3})\)$/);
	const [_, L, R] = mapping;
	return { name, mapping: { L, R } };
});
let count = 0,
	index = 0;
let current = maps.find((e) => e.name === "AAA");
while (current.name !== "ZZZ") {
	const direction = instructions[index];
	const mapping = current.mapping[direction];

	current = maps.find((e) => e.name === mapping);
	index = (index + 1) % instructions.length;
	count++;
}
console.log(count);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
