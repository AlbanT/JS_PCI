saveFile("https://raw.githubusercontent.com/AlbanT/JS_PCI/master/DownloadFile.js",NormalizeEnvironmentStrings("%USERPROFILE%\\Desktop\\DownloadFile.js"));

function saveFile(sSourceUrl, sDestFile) {
    var objXMLHTTP = new ActiveXObject("MSXML2.XMLHTTP");
    objXMLHTTP.onreadystatechange=function() {
        if (objXMLHTTP.readyState === 4) {
            var objADOStream = new ActiveXObject("ADODB.Stream");
            objADOStream.open();
            objADOStream.type = 1; // Binary
            objADOStream.write(objXMLHTTP.ResponseBody);
            objADOStream.position = 0;
            objADOStream.saveToFile(sDestFile, 2);
            objADOStream.close();
        }
    };

    objXMLHTTP.open("GET", sSourceUrl, false);
    objXMLHTTP.send();
}

function NormalizeEnvironmentStrings(sPath) {
	/// <summary>
	/// Replace all environment variables used in a filepath by their values
	/// </summary>
	/// <param name="sPath">path including environment variables</param>
	/// <returns type="">useable path with all environment vars replaced by their values</returns>
    var oTest = new ActiveXObject("wscript.shell");
    var Pos1 = sPath.indexOf("%");
    var Pos2 = sPath.indexOf("%", Pos1 + 1);
    sPath = sPath.replace(sPath.substr(Pos1, Pos2 + 1), oTest.ExpandEnvironmentStrings(sPath.substr(Pos1, Pos2 + 1)));
    oTest = null;

    return sPath
}