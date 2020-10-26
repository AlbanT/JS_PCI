var text, xmlDoc;
var App_path = GetPCIVariable("$!textPciName").substring(0, GetPCIVariable("$!textPciName").lastIndexOf("\\") + 1);

var myFile = App_path + "text.xml";
fso = new ActiveXObject("Scripting.FileSystemObject");
ForReading = 1;
ts = fso.OpenTextFile(myFile, ForReading);
s  = "";

while (!ts.AtEndOfStream)
{
	s += ts.ReadLine() + "\n";
}
ts.Close();


text = s;
/*
"<bookstore>" + 
	"<book>" +
		"<title>Everyday Italian</title>" +
		"<author>Giada De Laurentiis</author>" +
		"<year>2005</year>" +
	"</book>" + 
	"<book>" +
		"<title>Lord of the Rings</title>" +
		"<author>JRR Tolkien</author>" +
		"<year>1954</year>" +
	"</book>" + 
"</bookstore>";
*/


xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
xmlDoc.async = false;
xmlDoc.loadXML(text); 


var output = "title = " + xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue + "\n" + 
"author = " + xmlDoc.getElementsByTagName("author")[0].childNodes[0].nodeValue + "\n" + 
"year = " + xmlDoc.getElementsByTagName("year")[0].childNodes[0].nodeValue; 

alert(output);


var output = "title = " + xmlDoc.getElementsByTagName("title")[1].childNodes[0].nodeValue + "\n" + 
"author = " + xmlDoc.getElementsByTagName("author")[1].childNodes[0].nodeValue + "\n" + 
"year = " + xmlDoc.getElementsByTagName("year")[1].childNodes[0].nodeValue; 
alert(output);