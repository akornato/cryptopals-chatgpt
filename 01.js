const hexString =
  "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";

function hexToBinary(hex) {
  let binary = "";
  const lookupTable = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    a: "1010",
    b: "1011",
    c: "1100",
    d: "1101",
    e: "1110",
    f: "1111",
  };
  for (let i = 0; i < hex.length; i++) {
    binary += lookupTable[hex[i]];
  }
  return binary;
}

function binaryToBase64(binary) {
  let base64 = "";
  const lookupTable =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (let i = 0; i < binary.length; i += 6) {
    let slice = binary.slice(i, i + 6);
    while (slice.length < 6) {
      slice += "0";
    }
    let index = parseInt(slice, 2);
    base64 += lookupTable[index];
  }
  return base64;
}

const binaryString = hexToBinary(hexString);
const base64String = binaryToBase64(binaryString);
console.log(base64String);
