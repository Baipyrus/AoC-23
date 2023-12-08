import { readFileSync } from "fs";
const t0 = performance.now();

const patterns = [
	"01234",
	"00123",
	"00112",
	"00012",
	"00011",
	"00001",
	"00000",
];
const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const input = readFileSync("input.txt")
	.toString()
	.split("\r\n")
	.filter((e) => e.length > 0);
const plays = input.map((e) => {
	const [draw, bidding] = e.split(" ");

	let count = 0;
	const hand = draw
		.split("")
		.map((e) => cards.indexOf(e))
		.sort((a, b) => b - a)
		.map((e, i, a) => (i !== 0 && e !== (a[i - 1] ?? 0) ? ++count : count))
		.reduce((a, i) => a + i.toString());

	return { hand, draw, bidding };
});
console.log(plays);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
