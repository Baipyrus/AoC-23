import { readFileSync } from "fs";
const t0 = performance.now();

const lines = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0);
const ids = lines.map((e) => {
	const current = parseInt(e.match(/^Game (\d{1,3}):/)[1]);
	const pulls = e.split(":")[1].trim().split(";");

	let failure = false;
	for (const cubes of pulls) {
		const values = cubes.split(",").map((e) => e.trim());
		const bag = { red: 12, green: 13, blue: 14 };
		values.forEach((e) => {
			const splits = e.split(" ");
			const color = splits[1];
			const amount = parseInt(splits[0]);
			bag[color] = bag[color] - amount;
		});
		if (
			Object.keys(bag)
				.map((e) => bag[e])
				.filter((e) => e < 0).length > 0
		) {
			failure = true;
			break;
		}
	}

	return failure ? -1 : current;
});
const sum = ids.filter((e) => e >= 0).reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
