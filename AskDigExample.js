var strPrompt = "Selecteer een locatie";
nRet = AskDig(strPrompt, "strVar");
alert("nRet=" + nRet);

if (nRet > 0) { //OK is pressed
    alert("User selected:" + 
        " X" + GetPCIVariable("X@strVar") + 
        " Y" + GetPCIVariable("Y@strVar") + 
        " Z" + GetPCIVariable("Z@strVar"));
}function DigValues(){

nRet = AskDig("Pick Something", "PICK");
alert("nRet=" + nRet);

if (nRet <0 ) {
    return;
}

// Get the Enity Type number and define a real name. Use Number() to convert a string variable
switch (Number(GetPCIVariable("&ETYPE"))) {
    case 1: entitytype = "line";break;
    case 2: entitytype = "Arc";break;
    case 4: entitytype = "Point";break;
    default: entitytype = "unkown";
    }


hMsg = InitMessageString();
AddMessageString(hMsg, "Entity No. " + GetPCIVariable("&ENTNO") + "  Name " + GetPCIVariable("&ENAME") + " Type " + entitytype);
AddMessageString(hMsg," ");
AddMessageString(hMsg, "Direction " + GetPCIVariable("&DIRFLAG") + "  Port " + GetPCIVariable("&PORT") + " DigStat " + GetPCIVariable("&DIGSTAT"));
AddMessageString(hMsg," ");
AddMessageString(hMsg, "DIG  X" + GetPCIVariable("&XDIG") + " Y" + GetPCIVariable("&YDIG") + " Z" + GetPCIVariable("&ZDIG"));
AddMessageString(hMsg," ");
AddMessageString(hMsg, "SNAP X" + GetPCIVariable("&XSNAP") + " Y" + GetPCIVariable("&YSNAP") + " Z" + GetPCIVariable("&ZSNAP"));
AddMessageString(hMsg," ");
AddMessageString(hMsg, "PICK X" + GetPCIVariable("X@PICK") + " Y" + GetPCIVariable("Y@PICK") + " Z" + GetPCIVariable("Z@PICK"));


MessageBox(_MB_ICONINFORMATION, hMsg);
FreeMessageString(hMsg);

return;
}

DigValues ();