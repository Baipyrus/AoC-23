import { readFileSync } from "fs";
const t0 = performance.now();

const bends = {
	"|": [
		[0, -1],
		[0, 1],
	],
	"-": [
		[-1, 0],
		[1, 0],
	],
	L: [
		[0, -1],
		[1, 0],
	],
	J: [
		[0, -1],
		[-1, 0],
	],
	7: [
		[-1, 0],
		[0, 1],
	],
	F: [
		[1, 0],
		[0, 1],
	],
	S: [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	],
};
const relPos = (pos, x, y) => pos.some((e) => e[0] === x && e[1] === y);
const compare = (a, b) => a.x === b.x && a.y === b.y;

const input = readFileSync("input.txt")
	.toString()
	.split(/\r*\n/)
	.filter((e) => e.length > 0)
	.map((e) => e.split(""));
const startY = input.findIndex((e) => e.includes("S"));
const startX = input[startY].findIndex((e) => e === "S");

const open = [
		{
			distance: 0,
			symbol: "S",
			x: startX,
			y: startY,
		},
	],
	closed = [];
while (open.length > 0) {
	const current = open.shift();
	closed.push(current);

	const directions = bends[current.symbol];
	for (let j = -1; j < 2; j++)
		for (let i = -1; i < 2; i++) {
			if (!relPos(directions, i, j)) continue;

			const { x, y, distance } = current;
			const [nx, ny] = [x + i, y + j];
			const symbol = input[ny][nx];
			const nd = distance + 1;
			const next = {
				distance: nd,
				symbol,
				x: nx,
				y: ny,
			};

			if (closed.some((e) => compare(e, next))) continue;
			if (!relPos(bends[symbol], -i, -j)) continue;

			open.push(next);
		}
}
const furthest = closed.sort((a, b) => b.distance - a.distance)[0];
console.log(furthest.distance);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
