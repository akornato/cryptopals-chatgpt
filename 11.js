const crypto = require("crypto");

function encryptWithRandomKey(plaintext, useECB) {
  if (useECB) {
    const key = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-128-ecb", key, "");
    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { key, encrypted };
  } else {
    const key = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { key, iv, encrypted };
  }
}

function decryptWithKey(key, iv, encrypted) {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function encryptionOracle(plaintext) {
  plaintext = Buffer.from(plaintext);
  const prefix = crypto.randomBytes(Math.floor(Math.random() * 5) + 5);
  const suffix = crypto.randomBytes(Math.floor(Math.random() * 5) + 5);
  const combined = Buffer.concat([prefix, plaintext, suffix]);
  const useECB = crypto.randomBytes(1)[0] % 2 === 0;
  return encryptWithRandomKey(combined, useECB);
}

function isECB(ciphertext) {
  let blocks = [];
  for (let i = 0; i < ciphertext.length; i += 16) {
    blocks.push(ciphertext.slice(i, i + 16));
  }
  return blocks.length !== new Set(blocks).size;
}

const plaintext = "A".repeat(100);
const { encrypted } = encryptionOracle(plaintext);
console.log(isECB(encrypted));
