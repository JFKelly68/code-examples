// Function that takes in two strings and outputs the count of the number of characters that exist 
// 

function strlen(haystack, needle) {
	var count = 0,
		hashTable = makeHashTable(needle);

	for(var j=0, len=haystack.length; j<len; j++) {
		var _char = haystack[j];

		if(hashTable[_char]) {
			count++;
		}
		else {
			return count;
		}
	}	

	return count;
}

function makeHashTable(needle) {
	var hashTable = {};

	for(var j = 0, len = needle.length; j < len; j++) {
		var _char = needle[j];
		
		hashTable[_char] = 1;
	}

	return hashTable;
}

var one = "abcdefghijklmnopqrstuvwxyz",
	two = "abcdef",
	three = "cafhdb",
	a = "jameskelly",
	b = "amjse",
	x = "",
	y = "djfkr";

console.log("should be 6: ", strlen(one, two));
console.log("should be 4: ", strlen(one, three));
console.log("should be 5: ", strlen(a, b));
console.log("should be 0: ", strlen(x, y));
console.log("should be 0: ", strlen(y, x));