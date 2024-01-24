use crate::common::{convert_num, read_file, split_inputs, split_lines};

pub fn main() {
    let name = "day09";
    println!("Executing module '{name}' entrypoint . . . ");
    
    let content = read_file(name);
    let lines = split_lines(&content);
    let input = split_inputs(lines, &r"\s+");
    let sequences = convert_num(input);   
    
    let sum_input_0: i32 = sequences[0]
        .clone()
        .into_iter()
        .sum();
    println!("Erste Summe: {sum_input_0}");
}
