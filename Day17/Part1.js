import { readFileSync } from "fs";
const t0 = performance.now();

const input = readFileSync("input.txt")
    .toString()
    .split(/\r*\n/)
    .filter((e) => e.length > 0)
    .map((a, j) => a
        .split("")
        .map((b, i) => ({
            c: +b,
            x: i,
            y: j,
            g: 0,
            h: 0,
        })));
const man_dist = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

const start = input[0][0];
const end = input.slice(-1)[0].slice(-1)[0];
const open = [start], closed = [];

while (open.length > 0) {
    let record = {};
    for (const [index, next] of Object.entries(open)) {
        const distance = next.g + next.h;
        if (record?.distance ?? -1 < distance) {
            record.distance = distance;
            record.index = +index;
        }
    }

    const current = open.splice(record.index, 1)[0];
    closed.push(current);
    if (current === end) break;

    for (let j = -1; j < 2; j++)
        for (let i = -1; i < 2; i++) {
            if (!(i === 0 ^ j === 0)) continue;

            const nx = current.x + i;
            const ny = current.y + j;

            if (!input[ny]) continue;
            const next = input[ny][nx];
            if (!next || closed.includes(next)) continue;

            const nd = current.g + next.c;
            if (open.includes(next)) {
                if (nd < next.g)
                    next.g = nd;
                continue;
            }

            next.g = nd;
            next.h = man_dist(next, end);
            open.push(next);
        }
}
console.log(end.g);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
