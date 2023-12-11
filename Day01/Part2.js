import { readFileSync } from "fs";
const t0 = performance.now();

const names = {
	zero: "0",
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};
const lines = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0);
const numbers = lines.map((a) => {
	const f1 = Object.keys(names)
		.map((e) => [names[e], a.indexOf(e)])
		.filter((e) => e[1] >= 0)
		.sort((c, b) => c[1] - b[1])[0];
	const l1 = Object.keys(names)
		.map((e) => [names[e], a.lastIndexOf(e)])
		.filter((e) => e[1] >= 0)
		.sort((c, b) => b[1] - c[1])[0];

	const numbers = a
		.split("")
		.map((c, i) => [c, i])
		.filter((b) => parseInt(b));
	const f2 = numbers.sort((c, b) => c[1] - b[1])[0];
	const l2 = numbers.sort((c, b) => b[1] - c[1])[0];

	const before = [f1, f2, l1, l2];
	const after = before.sort((c, b) => c[1] - b[1]).filter((e) => e);
	const i = after.length - 1;
	if (!after[0] || !after[i]) debugger;
	return parseInt(after[0][0] + after[i][0]);
});
const sum = numbers.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
