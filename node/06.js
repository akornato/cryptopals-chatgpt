const fs = require("fs");
const decryptXOR = require("./03.js");

function hammingDistance(str1, str2) {
  // Convert the strings to Buffers
  const buf1 = Buffer.from(str1);
  const buf2 = Buffer.from(str2);

  // Compute the XOR of the two Buffers
  const xor = buf1.map((byte, i) => byte ^ buf2[i]);

  // Compute the Hamming distance as the number of set bits in the XOR
  return xor.reduce(
    (distance, byte) => distance + (byte.toString(2).match(/1/g) || []).length,
    0
  );
}

console.log(
  "hammingDistance test:",
  hammingDistance("this is a test", "wokka wokka!!!") === 37
    ? "passed"
    : "failed"
);

fs.readFile("data/06.txt", (err, data) => {
  if (err) throw err;

  const decodedData = Buffer.from(data.toString(), "base64");

  let minDistance = Infinity;
  let keySize = 0;

  // find the key size with a minimum normalised Hamming distance
  for (let i = 2; i <= 40; i++) {
    const keySizeDistance1 =
      hammingDistance(
        decodedData.subarray(0, i),
        decodedData.subarray(i, i * 2)
      ) / i;
    const keySizeDistance2 =
      hammingDistance(
        decodedData.subarray(i * 2, i * 3),
        decodedData.subarray(i * 3, i * 4)
      ) / i;
    const keySizeDistance3 =
      hammingDistance(
        decodedData.subarray(0, i),
        decodedData.subarray(i * 2, i * 3)
      ) / i;
    const keySizeDistance4 =
      hammingDistance(
        decodedData.subarray(0, i),
        decodedData.subarray(i * 3, i * 4)
      ) / i;
    const keySizeDistance =
      (keySizeDistance1 +
        keySizeDistance2 +
        keySizeDistance3 +
        keySizeDistance4) /
      4;
    if (keySizeDistance < minDistance) {
      minDistance = keySizeDistance;
      keySize = i;
    }
  }

  // break the ciphertext into blocks of KEYSIZE length
  const blocks = [];
  for (let i = 0; i < decodedData.length; i += keySize) {
    blocks.push(decodedData.subarray(i, i + keySize));
  }

  // transpose the blocks
  const transposedBlocks = [];
  for (let i = 0; i < keySize; i++) {
    transposedBlocks[i] = Buffer.alloc(blocks.length);
    for (let j = 0; j < blocks.length; j++) {
      transposedBlocks[i][j] = blocks[j][i];
    }
  }

  // build the repeating key out of single-character XOR keys
  const repeatingKey = [];
  for (let i = 0; i < transposedBlocks.length; i++) {
    let { key } = decryptXOR(transposedBlocks[i]);
    repeatingKey.push(key);
  }
  console.log("Repeating key:", String.fromCharCode(...repeatingKey));

  // decrypt the message
  const decryptedData = Buffer.alloc(decodedData.length);
  for (let i = 0; i < decodedData.length; i++) {
    decryptedData[i] = decodedData[i] ^ repeatingKey[i % repeatingKey.length];
  }
  console.log("Decrypted data: ", decryptedData.toString());
});
