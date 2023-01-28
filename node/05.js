function encrypt(text, key) {
  let encrypted = "";
  for (let i = 0; i < text.length; i++) {
    encrypted += (text.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(
      16
    );
  }
  return encrypted;
}

const originalText =
  "Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal";
console.log(encrypt(originalText, "ICE"));
