use crate::common::{read_file, match_inputs, split_lines};

#[allow(dead_code)]
pub fn part_two() {

}

#[allow(dead_code)]
pub fn part_one() {
    let input = setup();

    let mut galaxies = extract(input);
    expand(&mut galaxies);
}

fn extract(symbols: Vec<Vec<String>>) -> Vec<Galaxy> {
    let mut galaxies = Vec::new();
    
    for (y, line) in symbols.iter().enumerate() {
        for (x, symbol) in line.iter().enumerate() {
            if symbol.as_str() == "." { continue; }
            galaxies.push(Galaxy { x, y });
        }
    }

    galaxies
}


fn expand(galaxies: &mut Vec<Galaxy>) {
    
}

struct Galaxy {
    x: usize,
    y: usize,
}


fn setup() -> Vec<Vec<String>> {
    let name = "day11";
    println!("Executing module '{name}' entrypoint . . . ");
    
    let content = read_file(name);
    let lines = split_lines(&content);
    match_inputs(lines, &r".")
}
