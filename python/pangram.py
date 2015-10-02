
import string
import sys

def get_missing_letters(sentence, *sentences):
	# use the strng module to access preexisting lowercase alphabet
	alphabet = string.lowercase
	
	# allow users to input multiple different strings and still evaluate
	for arg in sentences:
		sentence += str(arg)
	
	# cast both alphabet and sentence (modified to be lowercase) to sets
	# then remove the letters/strings that alphabet has in common with sentence before casting to list 
	remainder = list((set(alphabet) - set(sentence.lower())))
	
	# list can then be sorted (sets are unordered)
	remainder.sort()
	
	# return the joined, sorted list
	return "".join(remainder)


if len(sys.argv) > 1:
	if len(sys.argv[2:]) > 0:
		print "The result of multiple phrases: ", get_missing_letters(sys.argv[1], sys.argv[2:])
	else:
		print "Command Line Arg: ", get_missing_letters(sys.argv[1])

else:
	print "First: ", get_missing_letters("THE QUICK brown fox jumps over the lazy dog")
	print "Second: ", get_missing_letters("Frankly my dear, I don't give a damn")
	print "Third: ", get_missing_letters("W4@7 !f ! sp34k 1337?")