I've asked [OpenAI's ChatGPT](https://chat.openai.com) to solve [Cryptopals challenges](https://cryptopals.com) in Node.js.

Some tasks are made harder to make it more interesting, for example convert hex to base64 without using `Buffer` class or any npm package etc.

I've had to fix the original ChatGPT code in the following places to make it actually work:

[03.js#L67](03.js#L67) - added `String.fromCharCode`, because ChatGPT was trying to call `toLowerCase` on a `number`
