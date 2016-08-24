var gdh2 = InitDigInfo();
// 162 163 164 165
var nRet2 = AskDigInfo("Pick a face, loop, edge or vertex on a solid body", gdh2, _ENTITYDIG, "162-165", "", _FALSE);

if (nRet2 == _FINISH) {
	// user pressed RMB without selecting anything
	MessageBox(_MB_ICONERROR, "Invalid input!");
}
else {
	QueryDigInfo(gdh2,0);
	FreeDigInfo(gdh2);
	
	alert("Entno = " + GetPCIVariable("&ENTNO") + "\n" + "Kiid = " + GetPCIVariable("&KIID"));
}