		var ECversion = "2012.20";

		//beginning of the result string
		var result="Some edgecam sytem variables:" + "\n\n";

		result += "\tInstallation folder = " + GetPCIVariable("&EDGELOCAL") + "\n";
		result += "\tNetwork folder = " + GetPCIVariable("&EDGEMASTER") + "\n";
		result += "\tMy documents folder = " + GetPCIVariable("&EDGEUSER") + "\n";
		result += "\tTemporary folder = " + GetPCIVariable("&EDGETEMP") + "\n";


		// Read additional parameters from the registry
		result += "\n\n\nValues read from the registry:" + "\n\n";

		var wsh = new ActiveXObject("WScript.Shell");

		//set the HKCU key for edgecam <ECversion>
		var keyHKCU = "HKCU\\Software\\Planit\\Edgecam\\" + ECversion + "\\Location";

		//set the HKLM key for edgecam <ECversion>
		var keyHKLM = "HKLM\\Software\\Planit\\Edgecam\\" + ECversion + "\\Location";



		//retrieve Strategy Manager data
		result += "Strategy Manager data:" + "\n";
		result += "\tMaster Strategy Files = " + wsh.RegRead(keyHKCU + "\\" + "MasterStrategyFiles") + "\n";
		result += "\tSub Strategy Files = " + wsh.RegRead(keyHKCU + "\\" + "SubStrategyFiles") + "\n";

		//retrieve Postprocessor data
		result += "\n\n" + "Postprocessor data:" + "\n";
		var PostFolders = wsh.RegRead(keyHKLM + "\\" + "CodeGeneratorFolder");
		var PostFolder = PostFolders.split(";");
		result += "\tMachdef folders = " + "\n";

		//list all postfolders
		for (i=0;i<PostFolder.length;i++)
		{
			result += "\t\t" + PostFolder[i] + "\n";
		}



		//retrieve Toolstore data
		result += "\n\n" + "Toolstore data:" + "\n";

		//get the connectionstring from the registry
		var ConnectionString = wsh.RegRead(keyHKCU + "\\" + "Tool Store Server");
		result += "\tConnectionString = " + ConnectionString + "\n";

		//split the connectionstring into seperate lines
		var Field = ConnectionString.split( ";");

		//prototype function for comparing the first characters of a string
		String.prototype.startsWith = function(str) {return (this.match("^"+str)==str)}

		//check all Fields and match the data
		for (i=0;i<Field.length;i++)
		{
			if (Field[i].startsWith("server=") == _TRUE) {
				result += "\tTstore server = " + Field[i].replace("server=" , "") + "\n";
			}
			
			if (Field[i].startsWith("database=") == _TRUE) {
				result += "\tTstore database = " + Field[i].replace("database=" , "") + "\n";
			}
		}

		result += "\tTool Store Directory = " + wsh.RegRead(key + "\\" + "Tool Store Directory") + "\n";

		result += "*************************************************************************************";

		//replace all the \ characters for / so EC displays it correctly
		var result = result.replace(/\\/g, "/"); 


		//show the result in the feedback window 
		Display(result);