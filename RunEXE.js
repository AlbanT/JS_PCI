/*
	Syntax: objShell.Run (strCommand, [intWindowStyle], [bWaitOnReturn])
	objShell    :  A WScript.Shell object
	strCommand  :  The Command to be executed
	intWindowStyle (Optional)  :  Int value indicating the appearance of the program's window. Not all programs make use of this. 
	bWaitOnReturn : Wait for the command to complete before continuing execution of the wsh script.
*/
// Start a NotePad
var shell = new ActiveXObject("WScript.Shell");
shell.run("notepad.exe C:\\Users\name\\Documents\fred.txt", 1 , True);

var oShell = new ActiveXObject("WScript.Shell");
var prog = "C:\\Program Files (x86)\\Planit\\Edgecam 2012 R1\\Cam\\edgecam.exe";
var file = "M:\\MyDocs\\packing adaptor.ppf";
		
//strCommand: "C:\\Program Files (x86)\\Planit\\Edgecam 2012 R1\\Cam\\edgecam.exe" "M:\\MyDocs\\packing adaptor.ppf"
oShell.Run('"'+prog+'"' + " " + '"'+file+'"',1,true);

alert("ready");