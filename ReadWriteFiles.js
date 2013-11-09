myFile = GetPCIVariable( "&EDGEUSER"  )  + "\\JSWriteFile.txt";

		// Create Text File
		fso = new ActiveXObject("Scripting.FileSystemObject");
		f = fso.CreateTextFile(myFile, true);

		f.writeline("-----------------------------");
		f.writeline("----  " + myFile );
		f.writeline("-----------------------------");
		f.writeline("&EDGELOCAL=" + GetPCIVariable( "&EDGELOCAL" ) );
		f.writeline("&EDGEUSER="  + GetPCIVariable( "&EDGEUSER"  ) );
		f.writeline("-----------------------------");

		f.Close();

		// Open it in notepad to save me finding it
		oShell = new ActiveXObject("Shell.Application");
		commandtoRun = "Notepad.exe";
		oShell.ShellExecute(commandtoRun, myFile, "", "open", "1");
		
		alert("continue?");

		// Read Text File
		//fso = new ActiveXObject("Scripting.FileSystemObject");
		ForReading = 1;
		ts = fso.OpenTextFile(myFile, ForReading);
		s  = "";

		while (!ts.AtEndOfStream)
		{
			s += ts.ReadLine() + "\n";
		}
		ts.Close();
		alert ("File contents\n\n" + s);