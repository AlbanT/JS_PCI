		var OpID = InitOperation("Add cornerrounder to Tstore", "", 0);
			AddUserModToOperation(OpID, "$Tool", "Name of tool", "", 0, "");   
			AddUserModToOperation(OpID, "Diameter", "Tool diameter", "", 0, "");  
			AddUserModToOperation(OpID, "Radius", "Corner radius", "", 0, "");	
			
			AddUserModToOperation(OpID, "$Database", "Database", "Settings", 0, "");   
			AddUserModToOperation(OpID, "$ComputerName", "ComputerName", "Settings", 0, ""); 
			AddUserModToOperation(OpID, "$SQLinstance", "SQL instance", "Settings", 0, ""); 	
		var nOpRet = DoOperationMods(OpID);

		if (nOpRet==_FINISH) {
			var Database = GetPCIvariable("$Database");
			var ComputerName = GetPCIvariable("$ComputerName");
			var SQLinstance = GetPCIvariable("$SQLinstance");

			//build the SQL query, note that this might need some tweaking in new EC versions!!!!
			var Query = AddCornerRounderQuery(GetPCIvariable("$Tool"), GetPCIvariable("Diameter"), GetPCIvariable("Radius"),100);
			
			//ActiveX control
			var connection = new ActiveXObject("ADODB.Connection") ;
			var connectionstring="Provider=SQLOLEDB;Integrated Security=SSPI;Data Source="+ComputerName+"\\"+SQLinstance+";Initial Catalog="+Database+";"
			connection.Open(connectionstring);
			
			connection.execute(Query)
			
			//close the connections between the macro and the SQL server
			connection.close;
		}


		function AddCornerRounderQuery(Name, Diameter, Radius, ShankLength) {
			var ShankDia = Number(Diameter) + 2 * Number(Radius);
			var Query = "INSERT INTO [TS_TOOL]" + "\n";
			Query += "           ([TL_TOOL_DESCRIPTION]" + "\n";
			Query += "           ,[TL_INSERT_DESC]" + "\n";
			Query += "           ,[TL_TOOL_CATEGORY_ID]" + "\n";
			Query += "           ,[TL_TOOL_TYPE_MILL_ID]" + "\n";
			Query += "           ,[TL_TOOL_TYPE_TURN_ID]" + "\n";
			Query += "           ,[TL_TOOL_TYPE_HOLE_ID]" + "\n";
			Query += "           ,[TL_STANDARD_CODE]" + "\n";
			Query += "           ,[TL_TEETH]" + "\n";
			Query += "           ,[TL_UNITS_ID]" + "\n";
			Query += "           ,[TL_HAND_OF_TOOL_ID]" + "\n";
			Query += "           ,[TL_DIAMETER]" + "\n";
			Query += "           ,[TL_SMALL_DIAMETER]" + "\n";
			Query += "           ,[TL_TAPER_PARAM_DERIVED_ID]" + "\n";
			Query += "           ,[TL_CORNER_RADIUS]" + "\n";
			Query += "           ,[TL_FLUTE_LENGTH]" + "\n";
			Query += "           ,[TL_THREAD]" + "\n";
			Query += "           ,[TL_THREAD_STORED_ID]" + "\n";
			Query += "           ,[TL_HAND_OF_THREAD_ID]" + "\n";
			Query += "           ,[TL_TIP_ANGLE]" + "\n";
			Query += "           ,[TL_SYMBOL_ID]" + "\n";
			Query += "           ,[TL_INCLUDED_ANGLE]" + "\n";
			Query += "           ,[TL_ANGLE]" + "\n";
			Query += "           ,[TL_ANGLE_STORED_ID]" + "\n";
			Query += "           ,[TL_CLEARANCE_ANGLE]" + "\n";
			Query += "           ,[TL_INSERT_SIZE]" + "\n";
			Query += "           ,[TL_INSERT_SIZE_STORED_ID]" + "\n";
			Query += "           ,[TL_STYLE_ID]" + "\n";
			Query += "           ,[TL_WIDTH]" + "\n";
			Query += "           ,[TL_REACH]" + "\n";
			Query += "           ,[TL_EDGE_ANGLE]" + "\n";
			Query += "           ,[TL_SHANK_LENGTH]" + "\n";
			Query += "           ,[TL_SHANK_WIDTH]" + "\n";
			Query += "           ,[TL_SHANK_DEPTH]" + "\n";
			Query += "           ,[TL_VISIBILITY]" + "\n";
			Query += "           ,[TL_TOOL_LOCATION_ID]" + "\n";
			Query += "           ,[TL_MACHINE]" + "\n";
			Query += "           ,[TL_INSERT_THICKNESS]" + "\n";
			Query += "           ,[TL_TOOL_GRAPHIC_FILE]" + "\n";
			Query += "           ,[TL_CENTRE_CUTTING]" + "\n";
			Query += "           ,[TL_MAX_PLUNGE_DEPTH]" + "\n";
			Query += "           ,[TL_RAMP_ANGLE]" + "\n";
			Query += "           ,[TL_TOOL_SORT_PRIORITY]" + "\n";
			Query += "           ,[TL_THROUGH_COOLANT]" + "\n";
			Query += "           ,[TL_USER1]" + "\n";
			Query += "           ,[TL_USER2]" + "\n";
			Query += "           ,[TL_USER3]" + "\n";
			Query += "           ,[TL_USER4]" + "\n";
			Query += "           ,[TL_UNDERCUT_DISTANCE]" + "\n";
			Query += "           ,[TL_END_CLEARANCE_ANGLE]" + "\n";
			Query += "           ,[TL_PRC_FEED_NON_WIPER]" + "\n";
			Query += "           ,[TL_WIPER_STYLE_ID]" + "\n";
			Query += "           ,[TL_INSERT_GEOMETRY_TYPE]" + "\n";
			Query += "           ,[TL_BACK_BORING_RETRACTABLE_INSERT]" + "\n";
			Query += "           ,[TL_MIN_HOLE_DIAMETER]" + "\n";
			Query += "           ,[TL_SHANK_INSERT_OFFSET]" + "\n";
			Query += "           ,[TL_CREATED]" + "\n";
			Query += "           ,[TL_MODIFIED]" + "\n";
			Query += "           ,[TL_TOOL_TYPE_PROBE_ID]" + "\n";
			Query += "           ,[TL_SHANK_F_PARAM]" + "\n";
			Query += "           ,[TL_DEPTH_OF_THREAD]" + "\n";
			Query += "           ,[TL_NUMBER_OF_THREAD_TEETH]" + "\n";
			Query += "           ,[TL_THREAD_STANDARDS]" + "\n";
			Query += "           ,[TL_TAP_TYPE]" + "\n";
			Query += "           ,[TL_DIAMETER_ACTUAL])" + "\n";
			Query += "     VALUES" + "\n";
			Query += "           ('" + Name + "'" + "\n";	//tool name
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";					//tool category 0=mill 1=turn 2=drill 4=probe
			Query += "           ,4" + "\n";					//mill tool category 0=endmill 1=bullnose 2=ballnose 3=slotmill 4=tapertool 5=facemill 6=T-slot 7=lollypop 8=thread
			Query += "           ,NULL" + "\n"; 
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,2" + "\n";					//nr of teeth
			Query += "           ,1" + "\n";					//units 0=inch 1=mm
			Query += "           ,NULL" + "\n";
			Query += "           ," + Diameter + "\n";					//tool diameter
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ," + Radius + "\n";					//flute length
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ," + ShankLength + "\n";					//shank length
			Query += "           ," + ShankDia + "\n";					//shank diameter
			Query += "           ,NULL" + "\n";
			Query += "           ,1" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,'" + GenerateCornerRounderCSV(Name, Diameter, Radius, ShankLength) + "'" + "\n";					//tool CSV file
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,'2010-01-26 15:36:57.683'" + "\n";
			Query += "           ,'2010-01-26 15:36:57.683'" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL)		   " + "\n";
			Query += "INSERT INTO [TS_MOUNTING]" + "\n";
			Query += "           ([MNT_JOB_DESC]" + "\n";
			Query += "           ,[MNT_TOOL_ID]" + "\n";
			Query += "           ,[MNT_COMMENT]" + "\n";
			Query += "           ,[MNT_LOADING_ANGLE]" + "\n";
			Query += "           ,[MNT_REVERSE]" + "\n";
			Query += "           ,[MNT_GAUGE_X]" + "\n";
			Query += "           ,[MNT_GAUGE_Y]" + "\n";
			Query += "           ,[MNT_GAUGE_Z]" + "\n";
			Query += "           ,[MNT_GAUGE_POINT_ID]" + "\n";
			Query += "           ,[MNT_SPINDLE_DIR_ID]" + "\n";
			Query += "           ,[MNT_TURRET_POSITION]" + "\n";
			Query += "           ,[MNT_TOOL_OFFSET]" + "\n";
			Query += "           ,[MNT_MACHINING_MODE_ID]" + "\n";
			Query += "           ,[MNT_TOOL_LIFE]" + "\n";
			Query += "           ,[MNT_COLOUR]" + "\n";
			Query += "           ,[MNT_LAYER]" + "\n";
			Query += "           ,[MNT_NOTES_SUBJECT]" + "\n";
			Query += "           ,[MNT_NOTES_FILE]" + "\n";
			Query += "           ,[MNT_NOTES]" + "\n";
			Query += "           ,[MNT_SPEC_SHEET]" + "\n";
			Query += "           ,[MNT_LAST_MATERIAL]" + "\n";
			Query += "           ,[MNT_CUT_DEPTH]" + "\n";
			Query += "           ,[MNT_FIXED]" + "\n";
			Query += "           ,[MNT_TOOL_GRAPHIC_FILE]" + "\n";
			Query += "           ,[MNT_HOLDER_TYPE]" + "\n";
			Query += "           ,[MNT_X_OFFSET]" + "\n";
			Query += "           ,[MNT_Y_OFFSET]" + "\n";
			Query += "           ,[MNT_Z_OFFSET]" + "\n";
			Query += "           ,[MNT_REACH]" + "\n";
			Query += "           ,[MNT_TOOL_SORT_PRIORITY]" + "\n";
			Query += "           ,[MNT_RADIUS_OFFSET]" + "\n";
			Query += "           ,[MNT_TURRET_ID]" + "\n";
			Query += "           ,[MNT_ANGLE_B]" + "\n";
			Query += "           ,[MNT_ANGLE_C]" + "\n";
			Query += "           ,[MNT_GROUP_CODE]" + "\n";
			Query += "           ,[MNT_ID_CODE]" + "\n";
			Query += "           ,[MNT_CREATED]" + "\n";
			Query += "           ,[MNT_MODIFIED]" + "\n";
			Query += "           ,[MNT_MINIMUM_BORE]" + "\n";
			Query += "           ,[MNT_BORE_REACH]" + "\n";
			Query += "           ,[MNT_AH_HEAD_ANGLE]" + "\n";
			Query += "           ,[MNT_AH_ARM_OFFSET]" + "\n";
			Query += "           ,[MNT_AH_LOWER_ARM_LENGTH]" + "\n";
			Query += "           ,[MNT_AH_UPPER_ARM_LENGTH]" + "\n";
			Query += "           ,[MNT_AH_LOWER_ARM_DIAMETER]" + "\n";
			Query += "           ,[MNT_AH_UPPER_ARM_DIAMETER]" + "\n";
			Query += "           ,[MNT_AH_LOWER_ARM_EXTENSION]" + "\n";
			Query += "           ,[MNT_AH_GRAPHIC_FILE]" + "\n";
			Query += "           ,[MNT_ROUGHING_TOOL]" + "\n";
			Query += "           ,[MNT_FINISHING_TOOL]" + "\n";
			Query += "           ,[MNT_AH_RATIO]" + "\n";
			Query += "           ,[MNT_AH_INVERT]" + "\n";
			Query += "           ,[MNT_AH_MNT_ANGLE]" + "\n";
			Query += "           ,[MNT_MULTIPOINT_TOOL]" + "\n";
			Query += "           ,[MNT_DESCRIPTION]" + "\n";
			Query += "           ,[MNT_INDEX_TURRET]" + "\n";
			Query += "           ,[MNT_IMPORTED_DATA_STATE]" + "\n";
			Query += "           ,[MNT_IMPORTED]" + "\n";
			Query += "           ,[MNT_TOOL_OFFSET_SECONDARY])" + "\n";
			Query += "     VALUES" + "\n";
			Query += "           ('<All Kit>'" + "\n";
			Query += "           ,(SELECT [TL_TOOL_ID] FROM [TS_TOOL] WHERE [TL_TOOL_DESCRIPTION]='" + Name + "')" + "\n";		//retrieve the tool id of the just created tool
			 Query += "           ,'" + Name + "'" + "\n";			//tool comment
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,100" + "\n";							//Z Gauge
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";							//tool number
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,2" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,'2010-01-26 15:36:57.683'" + "\n";
			Query += "           ,'2010-01-26 15:36:57.683'" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,1" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,0" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL" + "\n";
			Query += "           ,NULL)" + "\n";
			
			/* uncomment for debugging the query
			fso = new ActiveXObject("Scripting.FileSystemObject");
			f = fso.CreateTextFile("c:\\sql.log", true);
			f.writeline(Query);
			f.Close();
			*/
			
			return Query;
		}

		function GenerateCornerRounderCSV(Name, Diameter, Radius, ShankLength) {
				Diameter = Number(Diameter);
				Radius = Number(Radius);
				ShankLength = Number(ShankLength);
				
				var myToolDir = GetPCIVariable("&EDGEUSER") + "\\cam\\tstore";
				var myFile = myToolDir + "\\ToolingGraphics\\Mill\\" + Name + ".csv";
				
				fso = new ActiveXObject("Scripting.FileSystemObject");
				f = fso.CreateTextFile(myFile, true);
				
				var ShankRadius = (Diameter + (2 * Radius)) / 2;
				var ToolRadius = Diameter / 2;
				var ShankStickout = Number(ShankLength) + Number(Radius);
			
				
				f.writeline("USE_CUTTER,0");
				f.writeline("USE_SHANK,0");
				f.writeline("PROFILE_ROTATE,CUTTER,1,1");
				f.writeline("POINT,0.000000,0.000000,0.000000");
				f.writeline("POINT," + ToolRadius + ",0.000000,0.000000");
				f.writeline("POINT," + ToolRadius + ",0.000000,0.000000");
				f.writeline("ARC," + Radius + "," + ShankRadius + ",0.000000,0.000000,270.000000,360.000000");
				f.writeline("POINT," + ShankRadius + ",0.000000," + Radius);
				f.writeline("PROFILE_ROTATE,SHANK,1,1");
				f.writeline("POINT," + ShankRadius + ",0.000000,0.000000");
				f.writeline("POINT," + ShankRadius + ",0.000000," + ShankLength);
				f.writeline("OFFSET,0.000000,0.000000," + ShankStickout);
				
				f.Close();
				
				return myFile;
			}