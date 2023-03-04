package main

import (
	"fmt"
	"math"
	"strings"
)

func hexToBinary(hex string) string {
	var lookupTable = map[byte]string{
		'0': "0000",
		'1': "0001",
		'2': "0010",
		'3': "0011",
		'4': "0100",
		'5': "0101",
		'6': "0110",
		'7': "0111",
		'8': "1000",
		'9': "1001",
		'a': "1010",
		'b': "1011",
		'c': "1100",
		'd': "1101",
		'e': "1110",
		'f': "1111",
	}
	var binary strings.Builder
	for i := 0; i < len(hex); i++ {
		binary.WriteString(lookupTable[hex[i]])
	}
	return binary.String()
}

func binaryToBase64(binary string) string {
	var lookupTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
	var base64 strings.Builder
	for i := 0; i < len(binary); i += 6 {
		slice := binary[i:int(math.Min(float64(i+6), float64(len(binary))))]
		for len(slice) < 6 {
			slice += "0"
		}
		index := fromBinary(slice)
		base64.WriteByte(lookupTable[index])
	}
	return base64.String()
}

func fromBinary(binary string) int {
	value := 0
	for i := len(binary) - 1; i >= 0; i-- {
		if binary[i] == '1' {
			value += 1 << uint(len(binary)-1-i)
		}
	}
	return value
}

func main() {
	hexString := "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d"
	binaryString := hexToBinary(hexString)
	base64String := binaryToBase64(binaryString)
	fmt.Println(base64String)
}
