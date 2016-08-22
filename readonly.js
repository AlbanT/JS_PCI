
alert(ToggleReadOnly("C:\\inzak.ppf"));

alert(ToggleHidden("C:\\inzak.ppf"));

alert(FileDates("C:\\inzak.ppf"));

alert(ShowFileType("C:\\inzak.ppf"));

function ToggleReadOnly(filespec) {
	// https://msdn.microsoft.com/en-us/library/5tx15443%28v=vs.84%29.aspx
	var fso, f, r, s;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	f = fso.GetFile(filespec)
	if (f.attributes & 1) {
		f.attributes = f.attributes - 1;
		s = "readonly is cleared.";
	}
	else {
		f.attributes = f.attributes + 1;
		s =   "readonly is set.";
	}
	return(s);
}

function ToggleHidden(filespec) {
	// https://msdn.microsoft.com/en-us/library/5tx15443%28v=vs.84%29.aspx
	var fso, f, r, s;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	f = fso.GetFile(filespec)
	if (f.attributes & 2) {
		f.attributes = f.attributes - 2;
		s = "file is no longer hidden.";
	}
	else {
		f.attributes = f.attributes + 2;
		s =   "file is now hidden.";
	}
	return(s);
}

function FileDates(filespec) {
	var fso, f, s;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	f = fso.GetFile(filespec);
	s = "Created: " + f.DateCreated + "\n";
	s += "Last Accessed: " + f.DateLastAccessed + "\n";
	s += "Last Modified: " + f.DateLastModified;
	return(s);
}

function ShowFileSize(filespec) {
	var fso, f, s;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	f = fso.GetFile(filespec);
	s = f.Name + " uses " + f.size + " bytes.";
	return(s);
}

function ShowFileType(filespec)
{
   var fso, f, s;
   fso = new ActiveXObject("Scripting.FileSystemObject");
   if (fso.FolderExists(filespec))
      f = fso.GetFolder(filespec);
   else if (fso.FileExists(filespec))
      f = fso.GetFile(filespec);
   else
      s = "File or Folder does not exist.";
   s = f.Name + " is a " + f.Type; 
   return(s);
}

