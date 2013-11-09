var gdh1 = InitDigInfo();

var nRet = AskDigInfo("Pick Arc(s)", gdh1, _ENTITYDIG, _ETYPE_ARC, "", _TRUE);

if (nRet = _FINISH) { // Drop out of script if the user aborted
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