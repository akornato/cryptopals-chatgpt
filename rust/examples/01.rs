fn hex_to_binary(hex: &str) -> String {
    let mut binary = String::new();
    let lookup_table = [
        "0000", "0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010",
        "1011", "1100", "1101", "1110", "1111",
    ];
    for ch in hex.chars() {
        let digit = ch.to_digit(16).unwrap();
        binary.push_str(lookup_table[digit as usize]);
    }
    binary
}

fn binary_to_base64(binary: &str) -> String {
    let mut base64 = String::new();
    let lookup_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for i in (0..binary.len()).step_by(6) {
        let slice = format!("{:0<6}", &binary[i..i + 6]);
        let index = i32::from_str_radix(&slice, 2).unwrap();
        base64.push(lookup_table.chars().nth(index as usize).unwrap());
    }
    base64
}

fn main() {
    let hex_string = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";
    let binary_string = hex_to_binary(hex_string);
    let base64_string = binary_to_base64(&binary_string);
    println!("{}", base64_string);
}
