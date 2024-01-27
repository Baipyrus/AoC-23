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
            p: null,
            d: null
        })));
const man_dist = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
const get_dir = (e) => {
    const { d } = e;
    if (!d) return e.c;
    if (d.x === 1 && d.y === 0) return ">";
    if (d.x === 0 && d.y === 1) return "v";
    if (d.x === -1 && d.y === 0) return "<";
    if (d.x === 0 && d.y === -1) return "^";
};

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

            const dir_check = current.d?.x === i && current.d?.y === j;
            const direction = { x: i, y: j, c: dir_check ? (current?.c ?? 0) + 1 : 1 };
            if (direction.c > 3) continue;

            const nd = current.g + next.c;
            if (open.includes(next)) {
                if (nd < next.g) {
                    next.g = nd;
                    next.p = current;
                    next.d = direction;
                }
                continue;
            }

            next.g = nd;
            next.p = current;
            next.d = direction;
            next.h = man_dist(next, end);
            open.push(next);
        }
}
console.log(end.g);

const shortest = [];
let path = end;
while (path) {
    shortest.push(path);
    path = path.p;
}
console.log(
    input
        .map(a => a
            .map(b => shortest
                .includes(b) ?
                get_dir(b) : b.c
            ).join("")
        ).join("\n")
);

const t1 = performance.now();
console.log(`Runtime: ${t1 - t0}ms`);
