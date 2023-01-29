 function pad(plaintext, blockSize) {
  const data = Buffer.from(plaintext);
  const modulo = data.length % blockSize;
  const padLength = modulo ? blockSize - modulo : 0;
  const padding = Buffer.alloc(padLength, 32);
  return Buffer.concat([data, padding]);
};

console.log(pad("YELLOW SUBMARINE", 20));

module.exports = pad;
