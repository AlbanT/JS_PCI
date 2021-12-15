var text, xmlDoc;

/* determine the folder this pci is executed from */
var App_path = GetPCIVariable("$!textPciName").substring(0, GetPCIVariable("$!textPciName").lastIndexOf("\\") + 1);

/* declare the location of the XML file */
var myFile = "books.xml";

parseXML(); // execute the function

/*##################################################*/

function parseXML(){
	/* list of most important node types from https://www.w3schools.com/XML/dom_nodes_info.asp */
	var nodeType = {Element: 1, Attribute: 2, Text: 3, Comment: 8, Document: 9};


	/* read the contents of the XML file like any other textfile */
	fso = new ActiveXObject("Scripting.FileSystemObject");
	ForReading = 1;
	ts = fso.OpenTextFile(App_path + myFile, ForReading);
	text  = "";
	while (!ts.AtEndOfStream)
	{
		text += ts.ReadLine() + "\n";
	}
	ts.Close();

	/* parse the XML data */
	xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async = false;
	xmlDoc.loadXML(text); 

	/* report errors */
	if (xmlDoc.parseError.errorCode != 0){
		display(
			"Error Code: " + xmlDoc.parseError.errorCode + "\n" +
			"Error Reason: " + xmlDoc.parseError.reason +
			"Error Line: " + xmlDoc.parseError.line + "\n"
		);
		return false;
	}

	/* get all nodes of the type book */
	var books = xmlDoc.getElementsByTagName("book");
	display("found " + books.length + " titles in " + myFile + ":" + "\n");

	/* retrieve data using the TagName */
	display("**** print all book title nodes **********\n");
	for (i = 0; i < books.length; i++) { 
		if (books[i].nodeType == nodeType.Element) {
			display("\t" + "title: " + books[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + "\n");
			display("\t---- print all book category attributes -----\n");
			var x = xmlDoc.getElementsByTagName("book")[i].attributes;
			for (j = 0; j < x.length; j++){
				display("\t\tfound " + x.length + " attributes\n");
				display("\t\t\tcategory " + x.getNamedItem("category").nodeValue + "\n");
			}
			display("******************************************\n");
		}
	}

	display("**** loop thru all the books *************\n");
	for (i = 0; i < books.length; i++) { 
		// for every book in books
		display("book " + (i+1) + " has " + books[i].childNodes.length + " subnodes:" + "\n");

		var bookAttributes = books[i].attributes;
		display("\t" + bookAttributes.length + " attributes found:\n");
		for (k = 0; k < bookAttributes.length; k++){
			// for every attribute for the book
			display("\t\t" + bookAttributes[k].nodeName + ":\t" + bookAttributes[k].nodeValue + "\n");
		}
		

		for (j = 0; j < books[i].childNodes.length; j++){
			// for every childnode for the book
			display("\t" + books[i].childNodes[j].nodeName + ":\t" + books[i].childNodes[j].childNodes[0].nodeValue + "\n");

			var nodeAttributes = books[i].childNodes[j].attributes;
			if (nodeAttributes.length > 0) {
				display("\t\t" + nodeAttributes.length + " attributes found:\n");
				for (l = 0; l < nodeAttributes.length; l++){
					// for every attribute for every childnode of the book
					display("\t\t\t" + nodeAttributes[0].nodeName + ":\t" + nodeAttributes[0].nodeValue + "\n");
				}
			}
		}
	display("******************************************\n");
	}
	return true;
}