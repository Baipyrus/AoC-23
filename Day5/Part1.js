import { readFileSync } from "fs";
const t0 = performance.now();

const categories = readFileSync("input.txt").toString().split("\n\n");
const seeds = categories[0]
	.split(" ")
	.slice(1)
	.map((e) => parseInt(e));
const dictionaries = categories.slice(1).map((e) => {
	const splits = e.split("\n").filter((e) => e.length > 0);
	const name = splits[0].replace(" map:", "");
	const maps = splits.slice(1).map((a) =>
		a
			.split(" ")
			.filter((b) => b.length > 0)
			.map((c) => parseInt(c))
	);
	const filter = (j) => maps.reduce((a, i) => [...a, i[j]], []);
	return {
		name,
		ranges: {
			destination: filter(0),
			source: filter(1),
			length: filter(2),
		},
	};
});
const locations = seeds.map((e) =>
	dictionaries.reduce((a, i, j) => {
		const current = j === 0 ? e : a;
		return (
			i.ranges.source.reduce((b, p, k) => {
				const next = current - p;
				const inRange = next >= 0 && next <= i.ranges.length[k];
				return inRange ? i.ranges.destination[k] + next : b;
			}, null) ?? current
		);
	}, 0)
);
const closest = locations.reduce((a, i) => Math.min(a, i));
console.log(closest);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
