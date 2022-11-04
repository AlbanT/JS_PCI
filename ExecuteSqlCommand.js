//debugger; // start the visual studio debugger

/** @type sql datatype { https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/datatypeenum?view=sql-server-ver15 } */
var DataTypeEnum = { 
	adBigInt: 20, 	
	adBinary: 128,
	adBoolean: 11,	
	adBSTR: 8,
	adChapter: 136,
	adChar: 129,	
	adCurrency: 6,
	adDate:7,	
	adDBDate:133,
	adDBTime:134,
	adDBTimeStamp:135,
	adDecimal:14,
	adDouble:5,
	adEmpty:0,
	adError:10,
	adFileTime:64,
	adGUID:72,
	adIDispatch:9,
	adInteger:3,
	adIUnknown:13,
	adLongVarBinary:205,
	adLongVarChar:201,
	adLongVarWChar:203,
	adNumeric:131,
	adPropVariant:138,
	adSingle:4,
	adSmallInt:2,
	adTinyInt:16,
	adUnsignedBigInt:21,
	adUnsignedInt:19,
	adUnsignedSmallInt:18,
	adUnsignedTinyInt:17,
	adUserDefined:132,
	adVarBinary:204,
	adVarChar:200,
	adVariant:12,
	adVarNumeric:139,
	adVarWChar:202,
	adWChar:130
}

/** @type sql datatype { mapping from the ADO api data types to the TSQL datatypes: https://documentation.help/adosql/adoprg02_294j.htm} */
var SqlDataType = {
	bigint: DataTypeEnum.adBigInt,
	binary: DataTypeEnum.adBinary,
	bit: DataTypeEnum.adBoolean,
	char: DataTypeEnum.adChar,
	datetime: DataTypeEnum.adDBTimeStamp,
	decimal: DataTypeEnum.adNumeric,
	float: DataTypeEnum.adDouble,
	image: DataTypeEnum.adVarbinary,
	int: DataTypeEnum.adInteger,
	money: DataTypeEnum.adCurrency,
	nchar: DataTypeEnum.adWChar,
	ntext: DataTypeEnum.adWChar,
	numeric: DataTypeEnum.adNumeric,
	nvarchar: DataTypeEnum.adWChar,
	real: DataTypeEnum.adSingle,
	smalldatetime: DataTypeEnum.adTimeStamp,
	smallint: DataTypeEnum.adSmallInt,
	smallmoney: DataTypeEnum.adCurrency,
	sql_variant: DataTypeEnum.adVariant,
	sysname: DataTypeEnum.adWChar,
	text: DataTypeEnum.adChar,
	timestamp: DataTypeEnum.adBinary,
	tinyint: DataTypeEnum.adVarbinary,
	uniqueidentifier: DataTypeEnum.adGUID,
	varbinary: DataTypeEnum.adVarbinary,
	varchar: DataTypeEnum.adChar
}

/** @type sql parameter types { https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/parameterdirectionenum?view=sql-server-ver15} */
var ParameterDirectionEnum = {
	adParamInput:1,
	adParamInputOutput:3,
	adParamOutput:2,
	adParamReturnValue:4,
	adParamUnknown:0
}

/** @type sql command types { https://docs.microsoft.com/en-us/sql/ado/reference/ado-api/commandtypeenum?view=sql-server-ver15} */
var CommandTypeEnum = {
	//adCmdUnspecified: -1,
	adCmdText:1,
	adCmdTable:2,
	adCmdStoredProc:4
	//,adCmdUnknown:8,
	//adCmdFile:256,
	//adCmdTableDirect:512
}

/**
 * @description Run a query or stored procedure on the SQL toolstore database
 * @param {{type:number,command:string}} SQL_input 
 * @param {boolean} DEBUG
 * @returns js object containing the found record, row_count, column_count and SQL_input
 */
 function ExecuteSqlCommand(SQL_input, DEBUG){
	// ADO api
	var conn = new ActiveXObject("ADODB.Connection") ;
	var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
	var cmd = new ActiveXObject("ADODB.Command");
	conn.Open(connectionstring);
	cmd.ActiveConnection = conn;

	// set the command type and command text
	cmd.CommandType = SQL_input.type;
	cmd.CommandText = SQL_input.command;

	// add parameters
	for (x in SQL_input.param){
		if (SQL_input.param[x].value == undefined) {
			SQL_input.param[x].value = null;
		}
		
		if (SQL_input.param[x].length == undefined) {
			SQL_input.param[x].length = 0;
		}
		var param = cmd.CreateParameter(
			SQL_input.param[x].name, 
			SQL_input.param[x].datatype , 
			SQL_input.param[x].direction, 
			SQL_input.param[x].length, 
			SQL_input.param[x].value
		)

		if (SQL_input.param[x].datatype == DataTypeEnum.adDecimal || SQL_input.param[x].datatype == DataTypeEnum.adNumeric){
			/* If you specify a numeric data type (adNumeric or adDecimal) in the Type argument, then you must also set the NumericScale and Precision properties. */
			param.Precision = SQL_input.param[x].precision;
			param.NumericScale = SQL_input.param[x].scale;
		}
		cmd.Parameters.Append(param); 
	}

	//  execute the query
	var rs = cmd.Execute();
	var Records = {row_count: 0, column_count: 0, input: {}, record:[]};
	Records.input = SQL_input;
	try {
		Records.column_count = rs.fields.count;
		

		if(rs.fields.count > 0 ){
			// loop thru the records and add them to the Records object
			var i = 0;
			rs.MoveFirst;
			while(!rs.eof)
			{ 
				var columns = {record_id: i, column: []}
				for (j=0;j<rs.fields.count;j++){
					columns.column[j] = {value: "" + rs.fields(j)}
				}
				
				Records.record[i] = columns;
				i++;
				rs.movenext;
			}
			Records.row_count = i;

			// retrieve the column names and datatype for the resultset and join it in the Records object
			if (SQL_input.type == CommandTypeEnum.adCmdStoredProc || SQL_input.type == CommandTypeEnum.adCmdText || SQL_input.type == CommandTypeEnum.adCmdTable){
				cmd.CommandType = CommandTypeEnum.adCmdText;

//alert(SQL_input.command.replace(/'/g, "''"));


				switch (SQL_input.type){
					case CommandTypeEnum.adCmdStoredProc:
						cmd.CommandText = "SELECT name, system_type_name FROM sys.dm_exec_describe_first_result_set_for_object (OBJECT_ID('" + SQL_input.command + "'),NULL);";
						break;
					case CommandTypeEnum.adCmdText: 
						cmd.CommandText = "SELECT name, system_type_name FROM sys.dm_exec_describe_first_result_set ('" + SQL_input.command.replace(/'/g, "''") + "',NULL,0);";
						break;
					case CommandTypeEnum.adCmdTable: 
						cmd.CommandText = "SELECT name, system_type_name FROM sys.dm_exec_describe_first_result_set ('SELECT * FROM " + SQL_input.command + "',NULL,0);";
						break;
				}

				var rs = cmd.Execute();
				rs.MoveFirst;
				var i = 0;
				while(!rs.eof)
				{ 
					for (x in Records.record){
						var data = {col_id: i, description: "" + rs.fields(0), value: Records.record[x].column[i].value, datatype: "" + rs.fields(1)};
						Records.record[x].column[i] = data;
					}
					i++;
					rs.movenext;
				}
			}
		}
	}
	catch(err) {
		//Handle errors here
	}

	// optionally print the Records object as a JSON to the feedback window
	if (DEBUG) {
		var JSON_result = JSON.stringify(Records, null, 4); // https://attacomsian.com/blog/javascript-pretty-print-json
		JSON_result = JSON_result.replace(/\\/g, "/"); // replace all backslashes by slashes because the EDGECAM feedback uses \ as newline character
		Display(JSON_result + "\n");
	}

	return Records;
}