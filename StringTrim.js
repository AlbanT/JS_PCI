String.prototype.trim = function()
{return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")}

var myString = "   hello world    ";
var myTrimmedString = myString.trim();

alert("'" + myString + "'" + "\n" + "'" + myTrimmedString + "'");