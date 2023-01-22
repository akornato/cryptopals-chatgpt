I've asked [OpenAI's ChatGPT](https://chat.openai.com) to solve [Cryptopals challenges](https://cryptopals.com) in Node.js.

Some tasks are made harder to make it more interesting, for example convert hex to base64 without using `Buffer` class or any npm package etc.

Task MDs have original ChatGPT answer, while JS files have the final version with the following fixes (excluding minor stuff like prettier formatting or variable renames):

[03.js#L69](03.js#L69) - ChatGPT was trying `toLowerCase` a `number`, so added `String.fromCharCode`

[03.js#L82](03.js#L82) - ChatGPT was increasing the score with a rather obscure `letterCounts[char] * charFrequency[char]` which produced incorrect result. Fixed to `1 - letterCounts[char] / totalLetterCount - englishCharFrequency[char]`.
