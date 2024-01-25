use crate::common::{read_file, match_inputs, split_lines};

#[allow(dead_code)]
pub fn part_two() {

}

#[allow(dead_code)]
pub fn part_one() {
    let input = setup();
}

fn setup() -> Vec<Vec<String>> {
    let name = "day11";
    println!("Executing module '{name}' entrypoint . . . ");
    
    let content = read_file(name);
    let lines = split_lines(&content);
    match_inputs(lines, &r".")
}
