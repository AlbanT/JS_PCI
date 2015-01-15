var gdh1 = InitDigInfo();

var nRet = AskDigInfo("Pick Arc(s)", gdh1, _ENTITYDIG, _ETYPE_ARC, "", _TRUE);

if (nRet == _FINISH) { // Drop out of script if the user aborted
    var hMsg = InitMessageString();
    AddMessageString(hMsg, "Entity List"  );

    nElementNumber = 0; // initialise the entity counter
    do 
        {
        nRet = QueryDigInfo(gdh1,nElementNumber);   
        if (GetPCIVariable("&ENTNO") == 0) {
            break;
        }
        AddMessageString(hMsg, "Entity no. " + 
				GetPCIVariable("&ENTNO") + " : Arc Centre X" + 
				GetPCIVariable("&XCENTRE") + " Y" + 
				GetPCIVariable("&YCENTRE"));
        nElementNumber = nElementNumber +1;
        }
    while ( GetPCIVariable("&ENTNO") != 0)

    MessageBox(_MB_ICONINFORMATION, hMsg);
    FreeMessageString(hMsg);
}


// only allow a single digitise:

var gdh2 = InitDigInfo();

var nRet2 = AskDigInfo("Pick a Arc", gdh2, _ENTITYDIG, _ETYPE_ARC, "", _FALSE);

if (nRet == _FINISH) {
	MessageBox(_MB_ICONERROR, "Invalid input!");
}
else {
	QueryDigInfo(gdh2,0);
	var arc=GetPCIVariable("&ENTNO");
	FreeDigInfo(gdh2);
	Display("arc" + arc + "\\");
}
