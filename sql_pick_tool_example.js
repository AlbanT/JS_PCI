/// <reference path="c:\Program Files\Hexagon\Edgecam 2022.0\cam\PCI\pci-vsdoc.js" />
/// <reference path="A:\ExecuteSqlCommand.js" />

Include("A:\\ExecuteSqlCommand.js"); // import the functions and data enums for the SQL connection: https://github.com/AlbanT/JS_PCI/blob/master/ExecuteSqlCommand.js

AskBox(["tooltype^endmill^bullnose^ballnose^slotdrill^conical^facemill^Tslot^Lollipop^thread", "minimum diameter", "maximum diameter"], ["_RADIO_TOOLTYPE", "MIN_DIA", "MAX_DIA"]);

/* prepare an SQL object for ExecuteSqlCommand() 
		type: 	tells the script what kind of query it will receive. In this case it is a normal query, but it could have been a stored procedure: adCmdStoredProc.
		command:	the actual SQL query that we want to execute
*/
var tools = {
    type: CommandTypeEnum.adCmdText,
    command: "SELECT tt.TL_TOOL_DESCRIPTION, tt.TL_DIAMETER " +
        "FROM   dbo.TS_TOOL AS tt " +
        "WHERE  tt.TL_UNITS_ID = 1 " +
        "AND tt.TL_TOOL_CATEGORY_ID = 0 " +
        "AND  tt.TL_TOOL_TYPE_MILL_ID = " + (GetPCIVariable("_RADIO_TOOLTYPE") - 1) + " " +
        "AND (tt.TL_DIAMETER > " + GetPCIVariable("MIN_DIA") + " AND tt.TL_DIAMETER < " + GetPCIVariable("MAX_DIA") + ")"
}

/* pass the SQL object to the ExecuteSqlCommand function.
	The second argument determines if the function will print the result back to the feedback window
	After execution the passed SQL object also contains the resultset and additional data
*/
tools = ExecuteSqlCommand(tools, true);

/* tools now contains (used the 2022 sample toolstore):
{
    "row_count": 8,
    "column_count": 2,
    "input": {
        "type": 1,
        "command": "SELECT tt.TL_TOOL_DESCRIPTION, tt.TL_DIAMETER FROM   dbo.TS_TOOL AS tt WHERE  tt.TL_UNITS_ID = 1 AND tt.TL_TOOL_CATEGORY_ID = 0 AND  tt.TL_TOOL_TYPE_MILL_ID = 0 AND (tt.TL_DIAMETER > 6 AND tt.TL_DIAMETER < 12)"
    },
    "record": [
        {
            "record_id": 0,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "10.0 mm Multi-Flute End Mill",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "10",
                    "datatype": "float"
                }
            ]
        },
        {
            "record_id": 1,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "10.0 mm Multi-Flute End Mill-LS",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "10",
                    "datatype": "float"
                }
            ]
        },
        {
            "record_id": 2,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "7.0 mm Multi-Flute End Mill",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "7",
                    "datatype": "float"
                }
            ]
        },
        {
            "record_id": 3,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "7.0 mm Multi-Flute End Mill-LS",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "7",
                    "datatype": "float"
                }
            ]
        },
        {
            "record_id": 4,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "8.0 mm Multi-Flute End Mill",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "8",
                    "datatype": "float"
                }
            ]
        },
        {
            "record_id": 5,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "8.0 mm Multi-Flute End Mill-LS",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "8",
                    "datatype": "float"
                }
            ]
        },
        {
            "record_id": 6,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "9.0 mm Multi-Flute End Mill",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "9",
                    "datatype": "float"
                }
            ]
        },
        {
            "record_id": 7,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "9.0 mm Multi-Flute End Mill-LS",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "TL_DIAMETER",
                    "value": "9",
                    "datatype": "float"
                }
            ]
        }
    ]
}
*/

/* prepare a messagestring: https://help.edgecam.com/Content/Online_Help/en/2022_1/User_Guide/UserGuide.htm#pci_javascript/pci_js_initmessagestring.htm */
strOptions = InitMessageString();

/* loop thru all the found records and add the tooldescription (column 0) tot he MessageString */
for (x in tools.record) {
    AddMessageString(strOptions, tools.record[x].column[0].value);
}

/* show a MessageListBox and store the selected index in nRet (these lists start at 1 instead of 0) 
	https://help.edgecam.com/Content/Online_Help/en/2022_1/User_Guide/UserGuide.htm#pci_javascript/pci_js_messagelistbox.htm
*/
nRet = MessageListBox("Select an Option", strOptions, 1);
FreeMessageString(strOptions);


/* load the tool into EDGECAM: https://help.edgecam.com/Content/Online_Help/en/2022_1/User_Guide/UserGuide.htm#pci_javascript/pci_js_loadtool.htm */

// Initialising command: Milling Cutter
cmd1 = InitCommand(36, 108);

// Clear the command modifiers
ClearMods(cmd1);

// Load required tool from ToolStore
LoadTool(cmd1, tools.record[nRet - 1].column[0].value);

// Present dialog for interactive input (Optional)
cmdret = AskMods(cmd1);

// Check command completed
if (cmdret == _FINISH)
{
    gdh1 = InitDigInfo();
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
}
else {
    FreeCommand(cmd1);
}