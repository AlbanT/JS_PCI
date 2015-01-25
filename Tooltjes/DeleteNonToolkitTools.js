/// <reference path="c:\program files (x86)\planit\edgecam 2015 r1\cam\PCI\pci-vsdoc.js" />

SetPCIVariable("$TCname", CurrentToolkit());

var OpID = InitOperation("Purge Tstore", "", 0);
AddUserModToOperation(OpID, "$TCname", "Toolkit", "General", 0, "");
// add checkbox to activate/deactivate toolstore browse button
AddUserModToOperation(OpID, "_check_EmptyTools", "Remove tools without position number from toolkit?", "General^Toolkit", 0, "");
AddUserModToOperation(OpID, "_check_AutoTools", "Remove AutoTool tools from the Tstore?", "General^Toolstore", 0, "");
AddUserModToOperation(OpID, "_check_NewToolkits", "Remove all toolkits like 'New Toolkit.x' from the Tstore?", "General^Toolstore", 0, "");

var nOpRet = DoOperationMods(OpID);

if (nOpRet = _FINISH) {
    if (GetPCIVariable("_check_EmptyTools") == true) {
        DeleteNonToolkitTools(GetPCIVariable("$TCname"));
    }

    if (GetPCIVariable("_check_AutoTools") == true) {
       DeleteAutoTools() ;
    }

}







function DeleteNonToolkitTools(toolkit) {
            //ActiveX control
            var connection = new ActiveXObject("ADODB.Connection");
            var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
            connection.Open(connectionstring);

            var query = "";
            query += "DELETE FROM [dbo].[TS_MOUNTING]";
            query += "WHERE [MNT_JOB_DESC] = '" + toolkit + "' AND [MNT_TURRET_POSITION] is NULL";

           var result = connection.execute(query);

            //close the connections between the macro and the SQL server
           connection.close;
           return result;
}


function DeleteAutoTools() {
            //ActiveX control
            var connection = new ActiveXObject("ADODB.Connection");
            var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
            connection.Open(connectionstring);

            var query = "";
			query += "DELETE FROM [dbo].[TS_MOUNTING]";
			query += "	WHERE [MNT_TOOL_ID] in (SELECT [TL_TOOL_ID] FROM [dbo].[TS_TOOL] where [TL_TOOL_DESCRIPTION] like 'Autotool%')"
            query += "";
            query += "DELETE FROM [dbo].[TS_TOOL]";
					 "	WHERE [TL_TOOL_DESCRIPTION] like 'Autotool%'";

			var result = connection.execute(query);

            //close the connections between the macro and the SQL server
			connection.close;

			return result;
}


function CurrentToolkit() {
	var cmd1 = InitCommand(16, 62);
	GetModifier(cmd1, 249, "$CurrentToolkit");
	FreeCommand(cmd1);
	return GetPCIVariable("$CurrentToolkit");
}