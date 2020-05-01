/// <reference path="f:\program files\vero software\edgecam 2020.0\cam\PCI\pci-vsdoc.js" />
// Adapted from a version that Patrick Mercier posted on the eSupport forum
// This JS PCI will delete all workdatums which are not being used in the current PPF

//debugger;

nRet = ErrorLevel (0);

var cmd1 = InitCommand(10, 61);
var list = GetModifierList(cmd1, 244);  //list = "-1^Workplane-1^Workplane-2^Workplane-3"

FreeCommand(cmd1);  // release the workdatum command as it served its purpose giving us the list of CPL's

var arrayCPL = list.split("^");  // split the list on the ^ character
for (var x in arrayCPL) {
	// loop thru the array
	var cpl = arrayCPL[x];

	// skip the first one as it is not a CPL 
	if (x>0){
		// remove the CPL's
		var result = DeleteCPL(cpl);
		if (result == -3){
			Display("workdatum '" + cpl + "' is deleted.\n");
		}
	}
	
}

function DeleteCPL(strcpl)
{
	// Initialising command:- Workplane
	cmd1 = InitCommand(10, 61);
	ClearMods(cmd1);
	// Setting modifier 'Name'
	SetModifier(cmd1, 244, strcpl);
	return cmdret=ExecCommand(cmd1, -1);  // cmdret = -3 indicates a deleted CPL
}
