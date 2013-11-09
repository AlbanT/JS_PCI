var myString = "hello world";

var startswith = "bye";

if (myString.substr(0,startswith.length) == startswith) {
	alert("'" + myString + "' starts with '" + startswith + "'");
}
else {
	alert("'" + myString + "' doesn't start with '" + startswith + "'");
}