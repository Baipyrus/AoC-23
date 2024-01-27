use crate::common::{convert_num, match_inputs, read_file, split_lines};

#[allow(dead_code)]
pub fn part_two() {}

#[allow(dead_code)]
pub fn part_one() {
    let input = setup();
}

fn pathfind(grid: &mut Vec<Vec<Block>>) -> i32 {
    let mut closed: Vec<&mut Block> = Vec::new();
    let (end, mut open);
    {
        let result = init_pos(grid);
        end = result.0;
        open = result.1;
    };

    while !open.is_empty() {
        let mut current = None;
        let mut index = 0;
        let mut record = std::i32::MAX;

        // Get best distance + heuristic
        for (i, next) in open.iter().enumerate() {
            let score = next.d + next.h;
            if score < record {
                record = score;
                index = i;
            }
        }

        // Remove current from open set
        current = Some(open.remove(index));

        if let Some(current) = current {
            // Break if current is end
            if current.compare(end) {
                break;
            }

            // Scan neighbors, limit straight line length
            // Add neighbors to open set
            for (j, line) in grid.iter_mut().enumerate() {
                for (i, next) in line.iter_mut().enumerate() {
                    if !closed.contains(&next) && !open.contains(&next) {
                        next.d = current.d + next.c;
                        next.h = next.distance(end);
                        open.push(next);
                    }
                }
            }

            // Add current to closed set
            closed.push(current);
        }
    }

    end.d
}

fn init_pos(grid: &mut Vec<Vec<Block>>) -> (&mut Block, Vec<&mut Block>) {
    let mut open = Vec::new();

    let middle = grid.len() / 2;
    let (top, bottom) = grid.split_at_mut(middle);

    let start = top.first_mut().unwrap().first_mut().unwrap();
    let end = bottom.last_mut().unwrap().last_mut().unwrap();

    start.h = start.distance(end) as i32;
    open.push(start);

    (end, open)
}

struct Block {
    x: usize,
    y: usize,
    c: i32,
    d: i32,
    h: i32,
}

impl Block {
    fn distance(&self, other: &Block) -> i32 {
        let dx = (other.x as i32 - self.x as i32).abs();
        let dy = (other.y as i32 - self.y as i32).abs();
        dx + dy
    }

    fn compare(&self, other: &Block) -> bool {
        self.x == other.x && self.y == other.y
    }
}

impl PartialEq for Block {
    fn eq(&self, other: &Self) -> bool {
        self.compare(other)
    }
}

impl Eq for Block {}

fn setup() -> Vec<Vec<Block>> {
    let name = "day17";
    println!("Executing module '{name}' entrypoint . . . ");

    let content = read_file(name);
    let lines = split_lines(&content);
    let input = match_inputs(lines, &r".");

    convert_num(input)
        .iter()
        .enumerate()
        .map(|(j, v)| {
            v.iter()
                .enumerate()
                .map(|(i, n)| Block {
                    x: i,
                    y: j,
                    c: *n,
                    d: 0,
                    h: 0,
                })
                .collect()
        })
        .collect()
}
