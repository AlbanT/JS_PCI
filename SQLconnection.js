	//build the SQL query, note that this might need some tweaking in new EC versions!!!!
	var Query = "SELECT TL_TOOL_DESCRIPTION FROM TS_TOOL WHERE (TL_UNITS_ID = 1) AND (TL_TOOL_TYPE_MILL_ID = 0) ORDER BY TL_DIAMETER";
	var strOptions = InitMessageString();
	var ToolName = new Array();
	ToolName[0]=Query;
	
	//ActiveX control
	var connection = new ActiveXObject("ADODB.Connection") ;
	var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
	connection.Open(connectionstring);
	var rs = new ActiveXObject("ADODB.Recordset");
	rs.Open(Query, connection);
	rs.MoveFirst;

	//Loop thru the records.
	var i = 1;
	while(!rs.eof)
	{ 
		var temp = rs.fields(0);
		AddMessageString(strOptions, temp );
		ToolName[i] = "" + temp;  //I added the "" because apperently temp is no string. 
		i++;
		rs.movenext;
	} 
			
	//close the connections between the macro and the SQL server
	rs.close; 
	connection.close;

	nRet=MessageListBox("Available tools are:", strOptions, 2); 
	FreeMessageString(strOptions); 
	MessageBox(0,"Selected tool: '" + ToolName[nRet] + "'");
