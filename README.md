I've asked [OpenAI's ChatGPT](https://chat.openai.com) to solve [Cryptopals challenges](https://cryptopals.com) in Node.js.

Some tasks are made harder to make it more interesting, for example convert hex to base64 without using `Buffer` class or any npm package etc.

Task MDs have original ChatGPT answer, while JS files have the final version with the following fixes (excluding minor stuff like prettier formatting or variable renames):

[03.js#L60](03.js#L60) - added space to `englishCharFrequency`

[03.js#L67](03.js#L67) - ChatGPT was trying `toLowerCase` a `number`, so added `String.fromCharCode`
