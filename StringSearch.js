var myRegExp = /Alex/;
var string1 = "Today John went to the store and talked with Alex.";
var matchPos1 = string1.search(myRegExp);

if (matchPos1 != -1) {
	alert("There was a match"); 
}
else {
	alert("There was no match in the first string");
}