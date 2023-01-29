use std::error::Error;

fn xor_buffers(buf1: &[u8], buf2: &[u8]) -> Result<Vec<u8>, Box<dyn Error>> {
    if buf1.len() != buf2.len() {
        return Err(From::from("Buffers must be of equal length"));
    }

    let mut result = vec![0; buf1.len()];

    for i in 0..buf1.len() {
        result[i] = buf1[i] ^ buf2[i];
    }

    Ok(result)
}

fn main() -> Result<(), Box<dyn Error>> {
    let buf1 = hex::decode("1c0111001f010100061a024b53535009181c")?;
    let buf2 = hex::decode("686974207468652062756c6c277320657965")?;

    let xor_result = xor_buffers(&buf1, &buf2)?;
    println!("{}", hex::encode(xor_result));
    Ok(())
}
