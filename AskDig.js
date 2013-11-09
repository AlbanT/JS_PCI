var strPrompt = "Selecteer een locatie";
nRet = AskDig(strPrompt, "strVar");
alert("nRet=" + nRet);

if (nRet > 0) { //OK is pressed
    alert("User selected:" + 
        " X" + GetPCIVariable("X@strVar") + 
        " Y" + GetPCIVariable("Y@strVar") + 
        " Z" + GetPCIVariable("Z@strVar"));
}