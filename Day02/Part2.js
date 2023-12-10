import { readFileSync } from "fs";
const t0 = performance.now();

const lines = readFileSync("input.txt")
	.toString()
	.split("\n")
	.filter((e) => e.length > 0);
const powers = lines.map((e) => {
	const pulls = e.split(":")[1].trim().split(";");

	const min = { red: 0, green: 0, blue: 0 };
	pulls.forEach((cubes) => {
		const values = cubes.split(",").map((e) => e.trim());
		values.forEach((e) => {
			const splits = e.split(" ");
			const color = splits[1];
			const amount = parseInt(splits[0]);
			min[color] = Math.max(min[color], amount);
		});
	});

	return Object.keys(min)
		.map((e) => min[e])
		.reduce((a, i) => a * i);
});
const sum = powers.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
