const fs = require("fs");
const crypto = require("crypto");

const key = "YELLOW SUBMARINE";

fs.readFile("data/07.txt", (err, data) => {
  if (err) throw err;
  const cipher = crypto.createDecipheriv("aes-128-ecb", key, '');
  let decrypted = cipher.update(data.toString(), "base64", "utf8");
  decrypted += cipher.final("utf8");
  console.log(decrypted);
});
