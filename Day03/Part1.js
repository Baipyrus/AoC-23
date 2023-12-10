import { readFileSync } from "fs";
const t0 = performance.now();

const lines = readFileSync("input.txt")
	.toString()
	.split("\n")
	.filter((e) => e.length > 0)
	.map((e) => e.split(""));
const numbers = lines.map((a) => {
	const current = { index: 0, number: "" };
	const scan = a
		.map((c, i) => {
			if (!isNaN(c)) {
				current.number += c;
				return -1;
			} else if (current.number.length > 0) {
				const next = {
					number: current.number,
					index: current.index,
				};
				current.index = i + 1;
				current.number = "";
				return next;
			}
			current.index = i + 1;
			return -1;
		})
		.filter((e) => typeof e === "object" || e >= 0);
	if (current.number.length > 0) scan.push(current);
	return scan;
});
const adjacent = numbers
	.map((a, l) =>
		a.filter((n) => {
			for (let k = 0; k < n.number.length; k++)
				for (let i = -1; i < 2; i++)
					for (let j = -1; j < 2; j++)
						if (
							lines[l + j] &&
							(lines[l + j][n.index + k + i] ?? "").match(/[^.\s\w]/)
						)
							return true;
			return false;
		})
	)
	.filter((a) => a.length > 0);
const sum = [].concat(...adjacent).reduce((a, i) => a + parseInt(i.number), 0);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
