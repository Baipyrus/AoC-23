use crate::common::{read_file, split_inputs, split_lines};

pub fn main() {
    let name = "day9";
    println!("Executing module '{name}' entrypoint . . . ");
    
    let content = read_file(name);
    let lines = split_lines(&content);
    let input = split_inputs(lines, &r"\s+");
    
    for value in &input[0] {
        print!("{value}, ");
    }
}
