package main

import (
	"encoding/hex"
	"fmt"
)

func xorBuffers(buf1, buf2 []byte) []byte {
	if len(buf1) != len(buf2) {
		panic("Buffers must be of equal length")
	}

	result := make([]byte, len(buf1))

	for i := 0; i < len(buf1); i++ {
		result[i] = buf1[i] ^ buf2[i]
	}

	return result
}

func main() {
	buf1, _ := hex.DecodeString("1c0111001f010100061a024b53535009181c")
	buf2, _ := hex.DecodeString("686974207468652062756c6c277320657965")

	xorResult := xorBuffers(buf1, buf2)
	fmt.Println(hex.EncodeToString(xorResult))
}
