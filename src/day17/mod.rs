use crate::common::{convert_num, match_inputs, read_file, split_lines};

#[allow(dead_code)]
pub fn part_two() {}

#[allow(dead_code)]
pub fn part_one() {
    let input = setup();
}

fn setup() -> Vec<Vec<Block>> {
    let name = "day17";
    println!("Executing module '{name}' entrypoint . . . ");

    let content = read_file(name);
    let lines = split_lines(&content);
    let input = match_inputs(lines, &r".");

    convert_num(input)
}
