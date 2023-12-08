import { readFileSync } from "fs";
const t0 = performance.now();

const patterns = [
	"abcde",
	"aabcd",
	"aabbc",
	"aaabc",
	"aaabb",
	"aaaab",
	"aaaaa",
];
const input = readFileSync("input.txt").toString();
console.log(input);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
