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
const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const input = readFileSync("input.txt")
	.toString()
	.split("\r\n")
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
		const pattern = Object.keys(count)
			.map((e) => count[e])
			.sort((a, b) => b - a);
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
