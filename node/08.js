const fs = require("fs");

fs.readFile("data/08.txt", "utf8", (err, data) => {
  if (err) throw err;

  // Split the file into an array of hex-encoded ciphertexts
  const lines = data.split("\n");

  // Iterate over each ciphertext
  for (let i = 0; i < lines.length; i++) {
    // Convert the hex-encoded ciphertext to bytes
    const bytes = Buffer.from(lines[i], "hex");

    // Create an object to keep track of seen blocks
    const seenBlocks = {};

    // Iterate over 16-byte blocks of the ciphertext
    for (let j = 0; j < bytes.length; j += 16) {
      const block = bytes.subarray(j, j + 16).toString("hex");

      // If we've seen this block before, it's likely that this ciphertext
      // has been encrypted with ECB
      if (seenBlocks[block]) {
        console.log(lines[i]);
        console.log(`is likely encrypted with ECB.`);
        break;
      }
      seenBlocks[block] = true;
    }
  }
});
