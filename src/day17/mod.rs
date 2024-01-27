use crate::common::{convert_num, match_inputs, read_file, split_lines};

#[allow(dead_code)]
pub fn part_two() {}

#[allow(dead_code)]
pub fn part_one() {
    let input = setup();
}

fn pathfind(grid: &mut Vec<Vec<Block>>) -> i32 {
}

struct Block {
    x: usize,
    y: usize,
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
