nRet = Query("89", _TRUE); // 89 is the entity number
	ShowData();

	nRet = Query("myBoog", _TRUE); // myBoog is the entity name
	ShowData(); 

	function ShowData() {
		// initialize an edgecam MessageString
		var hMsg=InitMessageString(); 

		//add a line of text to the MessageString
		AddMessageString(hMsg, "Elementtype = " + GetPCIvariable("&ETYPE")); 
		AddMessageString(hMsg, "Elementnaam = " + GetPCIvariable("&ENAME")); 
		AddMessageString(hMsg, "Elementnummer = " + GetPCIvariable("&ENTNO")); 
		AddMessageString(hMsg, "Startpunt = X" + GetPCIvariable("&XSTART") + 
						 " Y" + GetPCIvariable("&YSTART") + 
								   " Z" + GetPCIvariable("&ZSTART")); 
		AddMessageString(hMsg, "Eindpunt = X" + GetPCIvariable("&XEND") + 
										 " Y" + GetPCIvariable("&YEND") + 
										 " Z" + GetPCIvariable("&ZEND")); 

		if (GetPCIvariable("&ETYPE") == 2) { //only available for arcs
			AddMessageString(hMsg, "Middelpunt = X" + GetPCIvariable("&XCENTRE") + 
											   " Y" + GetPCIvariable("&YCENTRE") + 
											   " Z" + GetPCIvariable("&ZCENTRE")); 
			AddMessageString(hMsg, "Radius = " + GetPCIvariable("&RADIUS")); 
		}

		//show the MessageString in a MessageBox
		nRet=MessageBox(_MB_OK+_MB_ICONINFORMATION,hMsg);

		//release the contents of the MessageString
		FreeMessageString(hMsg); 
	}
