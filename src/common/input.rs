use std::fs::File;
use std::io::{self, prelude::*};
use std::path::Path;

pub fn read_file(name: &str) -> String {
    let path = Path::new("src").join(name).join("input.txt");
    let mut file = File::open(&path).expect(&format!("Unable to open input for '{name}'."));

    let mut contents = String::new();
    file.read_to_string(&mut contents)
        .expect(&format!("Unable to read input for '{name}'."));

    contents
}

#[allow(dead_code)]
pub fn read_stdin() -> String {
    print!("Enter a single line of the input: ");

    let mut input = String::new();
    let _ = io::stdout().flush();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line!");

    input
}
