function decryptXOR(xorHexString) {
  const xorBuffer = Buffer.from(xorHexString, "hex");
  let bestScore = 0;
  let bestDecryption;
  let bestKey;

  // Iterate through all possible single-byte keys (0-255)
  for (let i = 0; i < 256; i++) {
    const key = i;
    const decryption = Buffer.alloc(xorBuffer.length);

    // XOR the buffer with the key
    for (let j = 0; j < xorBuffer.length; j++) {
      decryption[j] = xorBuffer[j] ^ key;
    }

    // Score the decryption using character frequency
    const score = scoreDecryption(decryption);

    // Update the best decryption if this one has a higher score
    if (score > bestScore) {
      bestScore = score;
      bestDecryption = decryption;
      bestKey = key;
    }
  }

  return {
    key: bestKey,
    decryption: bestDecryption.toString(),
    score: bestScore,
  };
}

function scoreDecryption(decryption) {
  // Character frequency data for English language
  const englishCharFrequency = {
    a: 0.08167,
    b: 0.01492,
    c: 0.02782,
    d: 0.04253,
    e: 0.12702,
    f: 0.02228,
    g: 0.02015,
    h: 0.06094,
    i: 0.06094,
    j: 0.00153,
    k: 0.00772,
    l: 0.04025,
    m: 0.02406,
    n: 0.06749,
    o: 0.07507,
    p: 0.01929,
    q: 0.00095,
    r: 0.05987,
    s: 0.06327,
    t: 0.09056,
    u: 0.02758,
    v: 0.00978,
    w: 0.0236,
    x: 0.0015,
    y: 0.01974,
    z: 0.00074,
    " ": 1,
  };

  let score = 0;
  // Count each letter in the decryption
  const letterCounts = {};
  for (let i = 0; i < decryption.length; i++) {
    const char = String.fromCharCode(decryption[i]).toLowerCase();
    if (char in englishCharFrequency) {
      if (char in letterCounts) {
        letterCounts[char]++;
      } else {
        letterCounts[char] = 1;
      }
    }
  }

  // Calculate the score based on the letter frequencies
  for (const char in letterCounts) {
    score += letterCounts[char] * englishCharFrequency[char];
  }

  return score;
}

const xorHexString =
  "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";
const { decryption, score } = decryptXOR(xorHexString);
console.log("XOR hex string: ", xorHexString);
console.log("Decryption: " + decryption.toString());
console.log("Score: " + score);

module.exports = decryptXOR;
