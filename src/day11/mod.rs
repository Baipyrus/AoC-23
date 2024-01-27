use crate::common::{match_inputs, read_file, split_lines};

#[allow(dead_code)]
pub fn part_two() {}

#[allow(dead_code)]
pub fn part_one() {
    let input = setup();

    let mut galaxies = extract(input);
    expand(&mut galaxies);
    let distances = sum_dist(galaxies);

    println!("The sum of all distances is: '{distances}'.");
}

fn sum_dist(galaxies: Vec<Galaxy>) -> usize {
    let mut distances = 0;

    for (i, a) in galaxies.iter().enumerate() {
        for b in galaxies.iter().skip(i) {
            if b.compare(a) {
                continue;
            }
            distances += a.distance(b);
        }
    }

    distances
}

fn extract(symbols: Vec<Vec<String>>) -> Vec<Galaxy> {
    let mut galaxies = Vec::new();

    for (y, line) in symbols.iter().enumerate() {
        for (x, symbol) in line.iter().enumerate() {
            if symbol.as_str() == "." {
                continue;
            }
            galaxies.push(Galaxy { x, y });
        }
    }

    galaxies
}

fn expand(_galaxies: &mut Vec<Galaxy>) {}

struct Galaxy {
    x: usize,
    y: usize,
}

impl Galaxy {
    fn distance(&self, other: &Galaxy) -> usize {
        let dx = (other.x as isize - self.x as isize).abs();
        let dy = (other.y as isize - self.y as isize).abs();
        (dx + dy) as usize
    }

    fn compare(&self, other: &Galaxy) -> bool {
        self.x == other.x && self.y == other.y
    }
}

fn setup() -> Vec<Vec<String>> {
    let name = "day11";
    println!("Executing module '{name}' entrypoint . . . ");

    let content = read_file(name);
    let lines = split_lines(&content);
    match_inputs(lines, &r".")
}
