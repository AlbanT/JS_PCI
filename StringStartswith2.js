String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str)}

var myStr = "Earth is a beautiful planet";

if (myStr.startsWith("Earth")) { // returns TRUE
	alert("TRUE");
}
else {
	alert("FALSE");
} 

if (myStr.endsWith("planet")) { // returns TRUE
	alert("TRUE");
}
else {
	alert("FALSE");
}