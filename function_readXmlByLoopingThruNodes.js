/**
 * @description get data from XML by reading thru the nodes
 * @author ATS_AT
 * @param xmlDoc object from loadXML(xmlfile)
 */
 function readXmlByLoopingThruNodes(xmlDoc){
	/* 
	note that <?xml version="1.0" encoding="UTF-8"?> is xmlDoc.childNodes[0]
	and <bookstore> is xmlDoc.childNodes[1] 
	and <book> is the childnode of <bookstore> a.k.a. xmlDoc.childNodes[1].childNodes
	*/
	var books = xmlDoc.childNodes[1].childNodes;

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
}