use std::error::Error;
use std::fs;
mod sol_03;
use sol_03::decrypt_xor;
use sol_03::Decryption;

fn main() -> Result<(), Box<dyn Error>> {
    let contents = fs::read_to_string("data/04.txt")?;
    let lines = contents.lines();

    let mut best_xor_hex_string = String::from("");
    let mut best_decryption: Vec<u8> = vec![];
    let mut best_score = 0.0;

    for line in lines {
        let xor_hex_string = line.trim();
        let Decryption {
            decryption, score, ..
        } = decrypt_xor(xor_hex_string).unwrap();
        if score > best_score {
            best_xor_hex_string = xor_hex_string.to_string();
            best_score = score;
            best_decryption = decryption;
        }
    }

    println!("-----------------");
    println!("Best XOR hex string: {}", best_xor_hex_string);
    println!(
        "Best decryption: {}",
        String::from_utf8(best_decryption).unwrap().trim()
    );
    println!("Best score: {}", best_score);

    Ok(())
}
