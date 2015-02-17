
var Stocks = AskForSolids("Pick the solids that represent the stock(s)");

// loop thru the Stocks object and print the value in the Feedback window
for (x in Stocks) {
	Display(x + "\n");
}

function AskForSolids(Question) {
	/// <summary>
	/// Ask the user to pick one or more solids and return their EntityNumbers
	/// </summary>
	/// <param name="Question">Question to ask the user</param>
	/// <returns type="">array with solid entity numbers</returns>
    
	// object used to store the entitynumbers
	var Result = new Object();	
	
	// initialize a digitize buffer
    var gdh1 = InitDigInfo();	
	
	// Ask the user for an selection
    var nRet = AskDigInfo(Question, gdh1, _ENTITYDIG, 161, "", _TRUE); 

	// check if the user pressed OK
    if (nRet == _FINISH) { 
		// initialise the entity counter
        nElementNumber = 0; 
        do {
			// Extract data from selected entities
            nRet = QueryDigInfo(gdh1, nElementNumber); 
            
			// &ENTNO == 0 when there are no more entities in the selection
			if (GetPCIVariable("&ENTNO") == 0) {
				
                break;
            }

			// add the entitynumber to the object
            Result[nElementNumber] = GetPCIVariable("&ENTNO");
			
			// increment the counter
            nElementNumber = nElementNumber + 1;	
        }
        while (GetPCIVariable("&ENTNO") != 0);
    }
	
	// return the object
    return Result; 
}
