
saveFile("https://www.dropbox.com/s/qivv97qckjtqnc6/ATS-edgeIT%20Remote%20support.exe","c:\\test.png");



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

function RunProcess(EXEpath, EXEargument, WaitForExit) {
	// Initialising commando:- Proces starten
    cmd1 = InitCommand(2, 102);
    ClearMods(cmd1);
    // Instellen van 'Pad naar programma^Bladeren...'
    SetModifier(cmd1, 76, EXEpath);
    // Instellen van 'Opdrachtprompt'
    SetModifier(cmd1, 81, EXEargument);
    // Instellen van 'Wacht'
    SetModifier(cmd1, 75, WaitForExit);
    cmdret = ExecCommand(cmd1, -1);
}