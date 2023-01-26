function pad(plaintext, blockSize) {
  const data = Buffer.from(plaintext);
  const padLength = blockSize - (data.length % blockSize);
  const padding = Buffer.alloc(padLength, padLength);
  return Buffer.concat([data, padding]);
}

console.log(pad("YELLOW SUBMARINE", 20));
