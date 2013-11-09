var aURL = "http://www.wia.nl/www.html";
var aPosition = aURL.indexOf("www");
var secondPos = aURL.indexOf("www", aPosition + 1);

alert("The 1st position of www  =  " + aPosition + "\n" +
	 "The 2nd position of www  =  " + secondPos);