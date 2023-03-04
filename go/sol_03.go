package main

import (
	"encoding/hex"
	"fmt"
)

func decryptXOR(xorHexString string) (key byte, decryption string, score float64, err error) {
	xorBuffer, err := hex.DecodeString(xorHexString)
	if err != nil {
		return 0, "", 0, err
	}

	bestScore := 0.0
	var bestDecryption []byte

	// Iterate through all possible single-byte keys (0-255)
	for i := 0; i < 256; i++ {
		key := byte(i)
		decryption := make([]byte, len(xorBuffer))

		// XOR the buffer with the key
		for j := 0; j < len(xorBuffer); j++ {
			decryption[j] = xorBuffer[j] ^ key
		}

		// Score the decryption using character frequency
		score := scoreDecryption(decryption)

		// Update the best decryption if this one has a higher score
		if score > bestScore {
			bestScore = score
			bestDecryption = decryption
			key = key
		}
	}

	return key, string(bestDecryption), bestScore, nil
}

func scoreDecryption(decryption []byte) float64 {
	// Character frequency data for English language
	englishCharFrequency := map[byte]float64{
		'a': 0.08167,
		'b': 0.01492,
		'c': 0.02782,
		'd': 0.04253,
		'e': 0.12702,
		'f': 0.02228,
		'g': 0.02015,
		'h': 0.06094,
		'i': 0.06094,
		'j': 0.00153,
		'k': 0.00772,
		'l': 0.04025,
		'm': 0.02406,
		'n': 0.06749,
		'o': 0.07507,
		'p': 0.01929,
		'q': 0.00095,
		'r': 0.05987,
		's': 0.06327,
		't': 0.09056,
		'u': 0.02758,
		'v': 0.00978,
		'w': 0.0236,
		'x': 0.0015,
		'y': 0.01974,
		'z': 0.00074,
		' ': 1,
	}

	var score float64
	// Count each letter in the decryption
	letterCounts := make(map[byte]int)
	for i := 0; i < len(decryption); i++ {
		char := decryption[i]
		if frequency, ok := englishCharFrequency[char]; ok {
			if _, ok := letterCounts[char]; ok {
				letterCounts[char]++
			} else {
				letterCounts[char] = 1
			}
			score += float64(letterCounts[char]) * frequency
		}
	}

	return score
}

func main() {
	xorHexString := "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
	decryption, key, score, _ := decryptXOR(xorHexString)
	fmt.Println("XOR hex string: ", xorHexString)
	fmt.Println("Key: ", key)
	fmt.Println("Decryption: ", decryption)
	fmt.Println("Score: ", score)
}
