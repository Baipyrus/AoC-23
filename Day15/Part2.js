import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt").toString().split("\n")[0].split(",");
const hashes = input.map((e) =>
	e.split("").reduce((a, i) => ((a + i.charCodeAt(0)) * 17) % 256, 0)
);
const sum = hashes.reduce((a, i) => a + i);
console.log(sum);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
