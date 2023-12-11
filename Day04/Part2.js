import { readFileSync } from "fs";
const t0 = performance.now();

const lines = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0);
const cards = lines.map((line) => {
	const id = parseInt(line.match(/^Card\s{1,}(\d{1,3}):/)[1]);
	const left = line
		.match(/:\s*((?:\s*\d{1,2})+)\s*\|/)[1]
		.split(/\s{1,}/)
		.map((num) => parseInt(num));
	const right = line
		.match(/\|\s*((?:\s*\d{1,2})+)\s*$/)[1]
		.split(/\s{1,}/)
		.map((e) => parseInt(e));
	const matches = right.filter((a) => left.some((b) => a === b)).length;
	return { id, left, right, matches };
});
const cardCount = (c) =>
	1 +
	[...Array(c.matches).keys()]
		.map((e) => cardCount(cards[c.id + e]))
		.reduce((a, n) => a + n, 0);
const totalCards = cards.map((e) => cardCount(e)).reduce((a, i) => a + i);
console.log(totalCards);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
