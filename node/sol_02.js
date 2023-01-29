function xorBuffers(buf1, buf2) {
  if (buf1.length !== buf2.length) {
    throw new Error("Buffers must be of equal length");
  }

  const result = Buffer.alloc(buf1.length);

  for (let i = 0; i < buf1.length; i++) {
    result[i] = buf1[i] ^ buf2[i];
  }

  return result;
}

const buf1 = Buffer.from("1c0111001f010100061a024b53535009181c", "hex");
const buf2 = Buffer.from("686974207468652062756c6c277320657965", "hex");

const xorResult = xorBuffers(buf1, buf2);
console.log(xorResult.toString("hex"));
