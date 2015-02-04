		SetPCIvariable("$Tool","10.0 mm Multi-Flute End Mill");

		var OpID = InitOperation("ListTools thru SQL", "", 0);
			AddUserModToOperation(OpID, "$Tool", "Name of tool", "", 0, "");   
			AddUserModToOperation(OpID, "_int_Teeth", "Number of teeth", "", 0, "");   
		var nOpRet = DoOperationMods(OpID);

		if (nOpRet==_FINISH) {

			//build the SQL query, note that this might need some tweaking between EC versions!!!!
			var Query = "UPDATE [TS_TOOL] SET [TL_TEETH] = "+GetPCIvariable("_int_Teeth")+" WHERE [TL_TOOL_DESCRIPTION] = '"+GetPCIvariable("$Tool")+"'";
			
			//ActiveX control
			var connection = new ActiveXObject("ADODB.Connection") ;
			var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
			connection.Open(connectionstring);
			var rs = new ActiveXObject("ADODB.Recordset");
			
			connection.execute(Query)
			
			//close the connections between the macro and the SQL server
			connection.close;
			
			GetToolFromTstore(GetPCIvariable("$Tool"));
			alert("Notice that the number of teeth is set to " + GetPCIvariable("_int_Teeth"));
		}


		function GetToolFromTstore(ToolName) {
			 cmd1 = InitCommand(36, 108);
			 ClearMods(cmd1);
			 // Instellen van 'Bibliotheek^Zoeken...'
			 SetModifier(cmd1, 180, ToolName);
			 // Instellen van 'Associatief'
			 SetModifier(cmd1, 79, "<Yes>");
			 gdh1 = InitDigInfo();
			 cmdret = ExecCommand(cmd1, gdh1);
			 FreeDigInfo(gdh1);
		}
