const fs = require("fs");
const decryptXOR = require("./03.js");

fs.readFile("04.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }

  // Split the file contents by newline
  const lines = data.split("\n");

  let bestXorHexString;
  let bestDecryption;
  let bestScore = 0;
  // Iterate through each line
  for (let i = 0; i < lines.length; i++) {
    // Attempt to decrypt the line
    const xorHexString = lines[i];
    const { decryption, score } = decryptXOR(xorHexString);
    if (score > bestScore) {
      bestXorHexString = xorHexString;
      bestScore = score;
      bestDecryption = decryption;
    }
  }

  console.log("-----------------");
  console.log("Best XOR hex string: " + bestXorHexString);
  console.log("Best decryption: " + bestDecryption.trim());
  console.log("Best score: " + bestScore);
});
