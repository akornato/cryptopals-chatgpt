const fs = require("fs");
const crypto = require("crypto");
const pad = require("./sol_09.js");

const key = "YELLOW SUBMARINE";
const blockSize = 16;
const iv = Buffer.alloc(blockSize);

function splitIntoBlocks(text) {
  const blocks = [];
  for (let i = 0; i < text.length; i += blockSize) {
    const block = text.slice(i, i + blockSize);
    blocks.push(block);
  }
  return blocks;
}

function xorBuffers(buf1, buf2) {
  if (buf1.length !== buf2.length) {
    throw new Error("Buffer lengths do not match");
  }
  const result = Buffer.alloc(buf1.length);
  for (let i = 0; i < buf1.length; i++) {
    result[i] = buf1[i] ^ buf2[i];
  }
  return result;
}

function encryptAES128CBC(key, iv, plaintext) {
  const paddedPlaintext = pad(plaintext, blockSize);
  const blocks = splitIntoBlocks(paddedPlaintext);
  const ciphertextBlocks = [];
  let prevCiphertextBlock = iv;
  for (let i = 0; i < blocks.length; i++) {
    let plaintextBlock = blocks[i];
    plaintextBlock = xorBuffers(plaintextBlock, prevCiphertextBlock);
    const cipher = crypto.createCipheriv("aes-128-ecb", key, "");
    cipher.setAutoPadding(false);
    let ciphertextBlock = cipher.update(plaintextBlock);
    ciphertextBlock = Buffer.concat([ciphertextBlock, cipher.final()]);
    ciphertextBlocks.push(ciphertextBlock);
    prevCiphertextBlock = ciphertextBlock;
  }
  return Buffer.concat(ciphertextBlocks);
}

function decryptAES128CBC(key, iv, ciphertext) {
  const blocks = splitIntoBlocks(ciphertext);
  const plaintextBlocks = [];
  let prevCiphertextBlock = iv;

  for (let i = 0; i < blocks.length; i++) {
    const ciphertextBlock = blocks[i];
    const decipher = crypto.createDecipheriv("aes-128-ecb", key, "");
    decipher.setAutoPadding(false);
    let plaintextBlock = decipher.update(ciphertextBlock);
    plaintextBlock = Buffer.concat([plaintextBlock, decipher.final()]);
    plaintextBlock = xorBuffers(plaintextBlock, prevCiphertextBlock);
    plaintextBlocks.push(plaintextBlock);
    prevCiphertextBlock = ciphertextBlock;
  }
  return Buffer.concat(plaintextBlocks);
}

fs.readFile("data/10.txt", "utf-8", (err, data) => {
  if (err) throw err;

  const decodedData = Buffer.from(data, "base64");
  console.log(decodedData.toString("base64"));
  const plaintextBlocks = decryptAES128CBC(key, iv, decodedData);
  console.log(plaintextBlocks.toString());
  const ciphertextBlocks = encryptAES128CBC(key, iv, plaintextBlocks);
  console.log(
    "Reencrypted matches source:",
    ciphertextBlocks.toString("base64") === decodedData.toString("base64")
  );
});
