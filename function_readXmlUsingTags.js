/**
 * @description get data from XML using TagNames
 * @author ATS_AT
 * @param xmlDoc object from loadXML(xmlfile)
 */
 function readXmlUsingTags(xmlDoc){
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
}