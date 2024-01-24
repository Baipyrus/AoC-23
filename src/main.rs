use std::time::Instant;

mod common;
mod day09;

fn main() {
    println!("Executing main entrypoint . . . ");
    let now = Instant::now();
    
    // day09::part_one();
    day09::part_two();

    let elapsed = now.elapsed();
    println!("Execution in {:?}.", elapsed);
}
