/// <reference path="f:\program files\vero software\edgecam 2020.0\cam\PCI\pci-vsdoc.js" />
// Adapted from a version that Patrick Mercier posted on the eSupport forum
// This JS PCI will delete all layers which are not being used in the current PPF


//CPL
// JavaScript Document

//debugger;

nRet = ErrorLevel (0);

var cmd1 = InitCommand(29, 66);
var list = GetModifierList(cmd1, 3);  //list = "-1^Workplane-1^Workplane-2^Workplane-3"

FreeCommand(cmd1);  // release the workdatum command as it served its purpose giving us the list of CPL's

var arrayLAYER = list.split("^");  // split the list on the ^ character
for (var x in arrayLAYER) {
	// loop thru the array
	var layer = arrayLAYER[x];

	// skip the first one as it is not a CPL 
	if (x>0){
		DeleteLayer(layer); // try to remove all layers, only empty layers which are not active can be removed.
	}
	
}

function DeleteLayer(LayerName) {
    /// <summary>
    /// Delete a layer
    /// </summary>
    /// <param name="LayerName" type="string">Name of the layer</param>

	// Initialising command:- Verwijder Lagen
	var cmd1 = InitCommand(50, 136); 
	ClearMods(cmd1); 
	// Setting modifier 'Naam'
	SetModifier(cmd1, 51, LayerName); 
	var cmdret = ExecCommand(cmd1, -1); 
}