use regex::Regex;

pub fn split_lines(input: &str) -> Vec<String> {
    input
        .split('\n')
        .filter(|line| !line.trim().is_empty())
        .map(|s| s.to_string())
        .collect()
}

pub fn split_input(entry: &str, re: &str) -> Vec<String> {
    let regex = Regex::new(re)
        .expect("Invalid regex");
    
    let split: Vec<String> = regex
        .split(entry)
        .map(|s| s.to_string())
        .collect();
    
    split
}

pub fn split_inputs(input: Vec<String>, re: &str) -> Vec<Vec<String>> {
    let mut result = Vec::new();

    for entry in input {
        let split = split_input(&entry, re);
        result.push(split);
    }

    result
}

pub fn convert_num(input: Vec<Vec<String>>) -> Vec<Vec<i32>> {
    input
        .into_iter()
        .map(|a| {
            a
                .into_iter()
                .map(|b| {
                    b
                        .trim()
                      .parse::<i32>()
                        .expect("Invalid numeric value in input!")
                }).collect()
        }).collect()
}
