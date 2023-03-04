fn encrypt(text: &str, key: &str) -> String {
    let mut encrypted = String::new();
    let key_length = key.len();
    for (i, c) in text.chars().enumerate() {
        let key_char = key.chars().nth(i % key_length).unwrap();
        let encrypted_char = (c as u8 ^ key_char as u8).to_string();
        encrypted.push_str(&encrypted_char);
    }
    encrypted
}

fn main() {
    let original_text =
        "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
    let key = "ICE";
    println!("{}", encrypt(original_text, key));
}
