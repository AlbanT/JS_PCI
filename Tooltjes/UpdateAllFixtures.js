/// <reference path="c:\program files\vero software\edgecam 2018 r2\cam\PCI\pci-vsdoc.js" />

// This JS PCI script inserts an update fixtures command in the machining cycle and automagically add all available fixture components to it.


/*
%InitCommand=cmd1=46,0
%ClearMods=[cmd1]
%SetModifier=[cmd1],14,UpdateAllFixtures.js
%ExecCommand=cmdret=[cmd1],-1
*/



UpdateAllFixtures();


function UpdateAllFixtures(){
	// Initialising command:- Spanmiddelen bijwerken
	var cmd1 = InitCommand(11, 213); 
	ClearMods(cmd1); 
	// Setting modifier 'Detecteer spanmiddel botsingen'
	SetModifier(cmd1, 343, "<Yes>"); 
	// Setting modifier 'Detecteer ruwdeel botsingen'
	SetModifier(cmd1, 344, "<Yes>"); 
	// Setting modifier 'Inclusief houder'
	SetModifier(cmd1, 345, "<Yes>"); 
	// Setting modifier 'Klem-toegift'
	SetModifier(cmd1, 239, "5"); 
	// Setting modifier 'Botsingscontrole index bewegingen'
	SetModifier(cmd1, 350, "<Yes>"); 
	// Setting modifier 'Spanmiddel toegift'
	SetModifier(cmd1, 358, "5"); 
	var gdh1 = InitDigInfo();

	// pick the fixtures to add
	var i = 1;
	while (FindEntityNo(_FINDENTNO_FROM_START, 15, i, 0) != 0) {
		BeginDigArray(gdh1, _ENTITYDIG);
		AddDigInfoEntnoDig(FindEntityNo(_FINDENTNO_FROM_START, 15, i, 0), _DIG_2DSNAP, _DIR_FORWARD);
		AddDigArray(gdh1);
		i++;
	}

	// Finish input
	AddFinishDig(gdh1, _FINISH);

	// pick the fixtures to remove

	// Finish input
	AddFinishDig(gdh1, _FINISH);
	var cmdret = ExecCommand(cmd1, gdh1); 
	FreeDigInfo(gdh1); 
}
