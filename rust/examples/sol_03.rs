use std::error::Error;

#[derive(Debug, PartialEq)]
pub struct Decryption {
    pub key: u8,
    pub decryption: Vec<u8>,
    pub score: f64,
}

pub fn decrypt_xor(xor_hex_string: &str) -> Result<Decryption, Box<dyn Error>> {
    let xor_buffer = hex::decode(xor_hex_string)?;
    let mut best_score = 0.0;
    let mut best_decryption = Vec::<u8>::new();
    let mut best_key = 0;
    for i in 0..256 {
        let key = i as u8;
        let decryption = xor_buffer.iter().map(|b| b ^ key).collect::<Vec<u8>>();
        let score = score_decryption(&decryption);
        if score > best_score {
            best_score = score;
            best_decryption = decryption;
            best_key = key;
        }
    }

    Ok(Decryption {
        key: best_key,
        decryption: best_decryption,
        score: best_score,
    })
}

fn score_decryption(decryption: &[u8]) -> f64 {
    // Character frequency data for English language
    let english_char_frequency = [
        ('a', 0.08167),
        ('b', 0.01492),
        ('c', 0.02782),
        ('d', 0.04253),
        ('e', 0.12702),
        ('f', 0.02228),
        ('g', 0.02015),
        ('h', 0.06094),
        ('i', 0.06094),
        ('j', 0.00153),
        ('k', 0.00772),
        ('l', 0.04025),
        ('m', 0.02406),
        ('n', 0.06749),
        ('o', 0.07507),
        ('p', 0.01929),
        ('q', 0.00095),
        ('r', 0.05987),
        ('s', 0.06327),
        ('t', 0.09056),
        ('u', 0.02758),
        ('v', 0.00978),
        ('w', 0.0236),
        ('x', 0.0015),
        ('y', 0.01974),
        ('z', 0.00074),
        (' ', 1.0),
    ];

    let mut score = 0.0;

    // Count each letter in the decryption
    let mut letter_counts = [0; 27];
    for b in decryption {
        if *b >= b'a' && *b <= b'z' {
            letter_counts[(*b - b'a') as usize] += 1;
        } else if *b >= b'A' && *b <= b'Z' {
            letter_counts[(*b - b'A') as usize] += 1;
        } else if *b == b' ' {
            letter_counts[26] += 1;
        }
    }

    // Calculate the score based on the letter frequencies
    for (ch, freq) in english_char_frequency.iter() {
        let idx = if *ch == ' ' {
            26
        } else {
            (*ch as u8 - b'a') as usize
        };
        score += (letter_counts[idx] as f64) * freq;
    }

    score
}

fn main() {
    let xor_hex_string = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";
    let decryption = decrypt_xor(xor_hex_string).unwrap();
    println!("XOR hex string: {}", xor_hex_string);
    println!("Decryption: {:?}", decryption);
}
