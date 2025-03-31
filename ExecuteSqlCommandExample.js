/* NOTE: determine the folder this pci is executed from */
var App_path = GetPCIVariable("$!textPciName").substring(
    0,
    GetPCIVariable("$!textPciName").lastIndexOf("\\") + 1
);

/* Import all functions from ExecuteSqlCommand.js */
Include(App_path + "ExecuteSqlCommand.js"); // we currently expect the library to reside in the same folder as the main script

/* prepare variables */
var toolName = "8.0 mm Spot Drill";

/* prepare the query */
/* PLEASE BE CAREFUL WITH UPDATE/DELETE/INSERT STATEMENTS!!!! Only alter or add data when you are sure about what you are doing. */
var Query = {
    type: CommandTypeEnum.adCmdText,
    command:
        "SELECT tt.TL_TOOL_DESCRIPTION, tm.MNT_JOB_DESC " +
        "FROM dbo.TS_TOOL AS tt " +
        "JOIN dbo.TS_MOUNTING AS tm ON tm.MNT_TOOL_ID = tt.TL_TOOL_ID " +
        "WHERE tt.TL_TOOL_DESCRIPTION = '" +
        toolName +
        "'"
};

/* execute the query and store the rsult in Query as a JS object  */
Query = ExecuteSqlCommand(Query, true /*print the result to the feedback window*/);

alert(Query.record[1 /*record_id*/].column[0 /*col_id*/].value);

/* The resulting JS object:

{
    "error": "",
    "connection": "Provider=SQLNCLI11;Password=xxxxx;User ID=xxxxx;DataTypeCompatibility=80;server=xxxxx//ECSQLEXPRESS;database=Sample_ToolStore_20241",
    "row_count": 3,
    "column_count": 2,
    "input": {
        "type": 1,
        "command": "SELECT tt.TL_TOOL_DESCRIPTION, tm.MNT_JOB_DESC FROM dbo.TS_TOOL AS tt JOIN dbo.TS_MOUNTING AS tm ON tm.MNT_TOOL_ID = tt.TL_TOOL_ID WHERE tt.TL_TOOL_DESCRIPTION = '8.0 mm Spot Drill'"
    },
    "record": [
        {
            "record_id": 0,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "8.0 mm Spot Drill",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "MNT_JOB_DESC",
                    "value": "<All Kit>",
                    "datatype": "nvarchar(255)"
                }
            ]
        },
        {
            "record_id": 1,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "8.0 mm Spot Drill",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "MNT_JOB_DESC",
                    "value": "Workflow Lathe 2 CYB mm",
                    "datatype": "nvarchar(255)"
                }
            ]
        },
        {
            "record_id": 2,
            "column": [
                {
                    "col_id": 0,
                    "description": "TL_TOOL_DESCRIPTION",
                    "value": "8.0 mm Spot Drill",
                    "datatype": "nvarchar(255)"
                },
                {
                    "col_id": 1,
                    "description": "MNT_JOB_DESC",
                    "value": "Workflow Lathe 2 CYBSS mm",
                    "datatype": "nvarchar(255)"
                }
            ]
        }
    ],
    "output": []
}
*/

/* using Stored Procedures:
This library also allows for the execution of Stored Procedures.

    var sp_insert_log = {
        type: CommandTypeEnum.adCmdStoredProc,
        command: "[EdgeIT].[InsertLog]",
        param: [
        {
            name: "@prod_order",
            datatype: SqlDataType.varchar,
            length: 10,
            direction: ParameterDirectionEnum.adParamInput,
            value: ''
        },
        {
            name: "@log_data",
            datatype: SqlDataType.nvarchar,
            length: -1,
            direction: ParameterDirectionEnum.adParamInput,
            value: TombstoneBuildName + ' Tombstone building started'
        },
        {
            name: "@succes",
            datatype: SqlDataType.bit,
            length: undefined,
            direction: ParameterDirectionEnum.adParamInput,
            value: true
        }]
    }
    ExecuteSqlCommand(sp_insert_log, false);

*/
