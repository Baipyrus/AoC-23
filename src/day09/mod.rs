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
        .map(|s| {
            let current = s.to_vec();
            let mut next = extra_diff(current);
            expand(&mut next);
            next
        })
        .collect();
    
    part_one(&structures);
}

fn part_one(strcts: &Vec<Vec<Vec<i32>>>) {
    let predictions: Vec<i32> = strcts
        .iter()
        .map(|seq|
            seq
                .first()
                .unwrap()
                .last()
                .unwrap()
                .clone()
        ).collect();
    let sum: i32 = predictions
        .iter()
        .sum();

    println!("The sum of all prediction values is: '{sum}'.");
}

fn expand(strct: &mut Vec<Vec<i32>>) {
    let last = strct
        .last_mut()
        .unwrap();
    last.push(*last
        .last()
        .unwrap()
    );

    for i in (0..strct.len() - 1).rev() {
        let last = strct
            .get(i + 1)
            .unwrap()
            .clone();
        let current = strct
            .get_mut(i)
            .unwrap();
        

        let next =
            current
                .last()
                .unwrap()
                .clone() +
            last
                .last()
                .unwrap()
                .clone();

        current.push(next);
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
