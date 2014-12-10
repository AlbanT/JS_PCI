
DeleteNonToolkitTools(CurrentToolkit());
DeleteAutoTools();


function DeleteNonToolkitTools(toolkit) {
            //ActiveX control
            var connection = new ActiveXObject("ADODB.Connection");
            var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
            connection.Open(connectionstring);

            var query = "";
            query += "DELETE FROM [dbo].[TS_MOUNTING]";
            query += "WHERE [MNT_JOB_DESC] = '" + toolkit + "' AND [MNT_TURRET_POSITION] is NULL";

            connection.execute(query);

            //close the connections between the macro and the SQL server
            connection.close;
}


function DeleteAutoTools() {
            //ActiveX control
            var connection = new ActiveXObject("ADODB.Connection");
            var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
            connection.Open(connectionstring);

            var query = "";
			query += "DELETE FROM [dbo].[TS_MOUNTING]";
			query += "	WHERE [MNT_TOOL_ID] in (SELECT [TL_TOOL_ID] FROM [CursusToolstore_2014R2].[dbo].[TS_TOOL] where [TL_TOOL_DESCRIPTION] like 'Autotool%')"
            query += "";
            query += "DELETE FROM [dbo].[TS_TOOL]";
					 "	WHERE [TL_TOOL_DESCRIPTION] like 'Autotool%'";

            connection.execute(query);

            //close the connections between the macro and the SQL server
            connection.close;
}


function CurrentToolkit() {
	var cmd1 = InitCommand(16, 62);
	GetModifier(cmd1, 249, "$CurrentToolkit");
	FreeCommand(cmd1);
	return GetPCIVariable("$CurrentToolkit");
}