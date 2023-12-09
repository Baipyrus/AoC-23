import { readFileSync } from "fs";
const t0 = performance.now();

const cardPattern = [
	[1, 1, 1, 1, 1],
	[2, 1, 1, 1],
	[2, 2, 1],
	[3, 1, 1],
	[3, 2],
	[4, 1],
	[5],
];
const cards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
const JOKER_INDEX = "12";
const input = readFileSync("input.txt")
	.toString()
	.split("\n")
	.filter((e) => e.length > 0);
const plays = input
	.map((p) => {
		const [draw, bidding] = p.split(" ");

		const count = draw
			.split("")
			.map((e) => cards.indexOf(e))
			.sort((a, b) => b - a)
			.reduce((a, i) => {
				const t = a;
				t[i] = (t[i] ?? 0) + 1;
				return t;
			}, {});
		const joker = count[JOKER_INDEX];
		const jCheck = joker && joker !== 5;
		if (jCheck) count[JOKER_INDEX] = 0;
		const pattern = Object.keys(count)
			.map((e) => count[e])
			.filter((e) => e > 0)
			.sort((a, b) => b - a);
		if (jCheck) pattern[0] += joker;
		const hand = cardPattern.findIndex((a) =>
			a.every((b, c) => b === pattern[c])
		);

		return { hand, draw, bidding: parseInt(bidding) };
	})
	.sort((a, b) => {
		const type = a.hand - b.hand;
		if (type !== 0) return type;

		for (const [i, c] of a.draw.split("").entries()) {
			const p1 = cards.indexOf(c);
			const p2 = cards.indexOf(b.draw[i]);

			if (p1 === p2) continue;
			return p1 > p2 ? -1 : 1;
		}
		return 0;
	})
	.map((e, i) => e.bidding * (i + 1))
	.reduce((a, i) => a + i);
console.log(plays);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
