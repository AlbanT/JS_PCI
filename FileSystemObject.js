// initialize the FileSystemObject
var FSO = new ActiveXObject("Scripting.FileSystemObject");
if (FSO.FolderExists(newpath)==_TRUE) {
	FSO.DeleteFolder(newpath, _TRUE);  // clean up if it exists to prevent errors
}

// get the location of the computers temp folder
// 0=WindowsFolder - Contains files installed by the Windows operating system
// 1=SystemFolder - Contains libraries, fonts, and device drivers
// 2=TemporaryFolder - Used to store temporary files 
var BaseFolder = FSO.GetSpecialFolder(2);
alert("BaseFolder = " + BaseFolder);

// show the basefolder in explorer to be able to see what happens
var shell = new ActiveXObject("WScript.Shell");
shell.run( "explorer.exe " + BaseFolder , 1 , _TRUE);

// append "\\FileSystemObject" to the BaseFolder
var newpath = FSO.BuildPath(BaseFolder, "\\FileSystemObject");
alert("newpath = " + newpath);

// check to see if the folder exists
if (FSO.FolderExists(newpath)==_TRUE) {
	alert(newpath + " exists");
}
else {
	alert(newpath + " doesn't exist");
}

// create the folder
FSO.CreateFolder(newpath);

alert("Folder " + newpath + " is created. \n continue?");

// generate a random tmp file
var RandomFilename = FSO.GetTempName();

// check to see if the file exists
if (FSO.FileExists(newpath+"\\"+RandomFilename)==_TRUE) {
	alert(RandomFilename + " exists");
}
else {
	alert(RandomFilename + " doesn't exist");
}

// create an empty file
var file = FSO.CreateTextfile(newpath+"\\"+RandomFilename, 0);
file.writeline("some random text");
file.close();

alert("File " + newpath+"\\"+RandomFilename + " is created. \n continue?");

// get the basename
var BaseName = FSO.GetBaseName(newpath+"\\"+RandomFilename);
alert("The base name is: " + BaseName);

// get the absolutepathname
var AbsolutePathName = FSO.GetAbsolutePathName(newpath+"\\"+RandomFilename);
alert("The Absolute PathName is: " + AbsolutePathName);

// get the extension of the file
var Extension = FSO.GetExtensionName(newpath+"\\"+RandomFilename);
alert("The ExtensionName is: " + Extension);

// extract the filename and discard the folderpath
var FileName = FSO.GetFileName(newpath+"\\"+RandomFilename);
alert("The FileName is: " + FileName);

// extract the folderpath and discard the filename
var Folder = FSO.GetFolder(newpath);
alert("The Folder is: " + Folder);

// extract the root folder
var ParentFolderName = FSO.GetParentFolderName(newpath);
alert("The ParentFolderName is: " + ParentFolderName);

afile = FSO.GetFile(newpath+"\\"+RandomFilename)
	/*
    objFile.Name 'and extension
    objFile.Size 'in bytes
    objFile.DateLastModified
    objFile.DateCreated
    objFile.DateLastAccessed
    objFile.Drive
    objFile.ParentFolder
    objFile.Path 'This is the entire path and file name with extension
    objFile.ShortName
    objFile.ShortPath
    objFile.Type 'A text description of the file type. Not the extension 
	*/
	size = afile.Size;
	createdate = afile.DateCreated
alert("The size of " + RandomFilename + " is: " + size + " bytes" + "\n" + "and the file is created on " + createdate);

// copy the file
FSO.CopyFile(newpath+"\\"+RandomFilename, newpath+"\\test.txt", _TRUE);

alert("test.txt is a copy of " + RandomFilename + "\n" + "continue?");

// move the file
FSO.MoveFile(newpath+"\\test.txt", newpath+"\\test2.txt");
alert("test.txt is moved/renamed to test2.txt" + "\n" + "continue?");


// copy the folder
FSO.CopyFolder(newpath,BaseFolder+"\\FileSystemObject2",_TRUE);
alert(newpath + " is copied to " + BaseFolder+"\\FileSystemObject2" + "\n" + "continue?");

// move the folder
FSO.MoveFolder(BaseFolder+"\\FileSystemObject2",BaseFolder+"\\FileSystemObject3");
alert(BaseFolder+"\\FileSystemObject2" + " is moved/renamed to " + BaseFolder+"\\FileSystemObject3" + "\n" + "continue?");


// delete the file
FSO.DeleteFile(newpath+"\\"+RandomFilename, _TRUE);

// delete the folders
FSO.DeleteFolder(newpath, _TRUE);
FSO.DeleteFolder(BaseFolder+"\\FileSystemObject3", _TRUE);