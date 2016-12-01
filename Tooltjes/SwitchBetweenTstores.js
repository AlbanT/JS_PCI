/// <reference path="c:\program files\vero software\edgecam 2016 r2\cam\PCI\pci-vsdoc.js" />


AskBox(["Machine^DMG^Haas^"],["_radio_Machine"]);

var Machine = GetPCINumber("_radio_Machine");
var DB = "";
var Loc = "";


switch (Machine) {
	case 1:
		DB = "Sample_ToolStore_2016R2";
		Loc = "f:\\documents\\vero software\\2016.20\\edgecam\\cam\\tstore\\";
		break;
	case 2:
		DB = "Sample_ToolStore_2016R2_2";
		Loc = "F:\\VERO\\2016.20\\Edgecam\\";
		break;
}


// Initialising command:- PCI Gereedschapsbibliotheek instellen
cmd1 = InitCommand(50, 252);
ClearMods(cmd1);
// Setting modifier 'Server'
SetModifier(cmd1, 100, "(localdb)");
// Setting modifier 'Instantie'
SetModifier(cmd1, 101, "ECSQLEXPRESS");
// Setting modifier 'Database'
SetModifier(cmd1, 102, DB);
// Setting modifier 'Support bestanden map'
SetModifier(cmd1, 103, Loc);
gdh1 = InitDigInfo();
cmdret=ExecCommand(cmd1, gdh1);
FreeDigInfo(gdh1);
