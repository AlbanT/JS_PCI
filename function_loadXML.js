/**
 * @description reads xml textfile and returns XMLDOM document
 * @author ATS_AT
 * @param xmlfile
 * @return object {xml, error {code, reason, line}} 
 */
function loadXML(xmlfile){
	/* read textfile */
	fso = new ActiveXObject("Scripting.FileSystemObject");
	ForReading = 1;
	ts = fso.OpenTextFile(xmlfile, ForReading);
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

	/* build output object */
	var output;
	if (xmlDoc.parseError.errorCode != 0){
		var myErr = xmlDoc.parseError;
		output = {
			 xml: "",
			 error: {
				code: myErr.errorCode, 
				reason: myErr.reason,
				line: myErr.line
			}
		}
	}
	else {
		output = {
			 xml: xmlDoc,
			 error: 0
		}
	}
	return output;
}