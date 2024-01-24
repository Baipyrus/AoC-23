use crate::common::{convert_num, read_file, split_inputs, split_lines};

pub fn main() {
    let name = "day09";
    println!("Executing module '{name}' entrypoint . . . ");
    
    let content = read_file(name);
    let lines = split_lines(&content);
    let input = split_inputs(lines, &r"\s+");

    let sequences = convert_num(input);   
    let structures: Vec<Vec<Vec<i32>>> = sequences
        .iter()
        .map(|s| extra_diff(s.to_vec()))
        .collect();

    for seq in structures[0].clone() {
        for n in seq {
            print!("{n} ");
        }
        println!("");
    }
}

fn extra_diff(seq: Vec<i32>) -> Vec<Vec<i32>> {
    let mut structure = vec![seq]; 
    let mut index = 0;

    loop {
        let current = &structure[index];
        let diff = seq_diff(current.to_vec());
        
        if diff.iter().all(|&n| n == 0) {
            break structure;
        }

        structure.push(diff);
        index += 1;
    }
}

fn seq_diff(seq: Vec<i32>) -> Vec<i32> {
    let mut diff = Vec::new();

    for (i, n) in seq.iter().skip(1).enumerate() {
        diff.push(n - seq[i]);
    }

    diff
}
