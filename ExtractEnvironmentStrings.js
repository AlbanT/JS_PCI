
var Input = "%USERPROFILE%\\test.txt";
var Output = NormalizeEnvironmentStrings(Input);
alert(Input + "\n" + Output);

var Input = "%TEMP%\\test.txt";
var Output = NormalizeEnvironmentStrings(Input);
alert(Input + "\n" + Output);

var Input = "%APPDATA%\\test.txt";
var Output = NormalizeEnvironmentStrings(Input);
alert(Input + "\n" + Output);

var Input = "%LOCALAPPDATA%\\test.txt";
var Output = NormalizeEnvironmentStrings(Input);
alert(Input + "\n" + Output);


function NormalizeEnvironmentStrings(sPath) {
	var oTest = new ActiveXObject("wscript.shell");
	var Pos1 = sPath.indexOf("%");
	var Pos2 = sPath.indexOf("%", Pos1 + 1);
	sPath = sPath.replace(sPath.substr(Pos1,Pos2 + 1), oTest.ExpandEnvironmentStrings(sPath.substr(Pos1,Pos2 + 1)));
	oTest = null;

	return sPath
}
