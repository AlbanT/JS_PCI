CreateCPL("TEST",RandomGetal(360));

SetCPL(GetPCIVariable("&TOP")); // GetPCIVariable("&TOP") => boven of top afhankelijk van de taalinstellingen

var LineNumber = DrawLine();

SetCPL("TEST");

alert(CalculatedAngle(LineNumber));

function CalculatedAngle(EntNo) {
	Query(LineNumber, true);

	var Xpos = GetPCIvariable("&XEND");
	var Ypos = GetPCIvariable("&YEND");

	return Math.atan2(Ypos,Xpos) * (180 / Math.PI);
}

function RandomGetal(MaxValue) {
	return Math.floor(Math.random()*(MaxValue+1));
}

function CreateCPL(Name, Zangle){
	// Initialising commando:- CPL
	cmd1 = InitCommand(2, 61);
	ClearMods(cmd1);
	// Instellen van 'Naam'
	SetModifier(cmd1, 242, Name);
	SetModifier(cmd1, 246, "<None>");
	// Instellen van 'Referentie'
	SetModifier(cmd1, 238, "");
	// Instellen van 'CPL'
	SetModifier(cmd1, 244, GetPCIVariable("&TOP"));
	SetModifier(cmd1, 117, "<None>");
	// Instellen van 'Roteren'
	SetModifier(cmd1, 236, "");
	// Instellen van 'Z Rotatie'
	SetModifier(cmd1, 23, Zangle);
	// Instellen van 'Werkvlak'
	SetModifier(cmd1, 100, "Frezen(XY)|0");
	// Instellen van 'Tekenvrijheid'
	SetModifier(cmd1, 101, "3D|1");
	gdh1 = InitDigInfo();
	cmdret = ExecCommand(cmd1, gdh1);
	FreeDigInfo(gdh1);
}

function SetCPL(Name) {
	// Initialising commando:- CPL
	cmd1 = InitCommand(16, 61);
	ClearMods(cmd1);
	// Instellen van 'Naam'
	SetModifier(cmd1, 244, Name);
	gdh1 = InitDigInfo();
	cmdret = ExecCommand(cmd1, gdh1);
	FreeDigInfo(gdh1);
}

function DrawLine() {
	var result = GetPCIvariable("&NEXTENT");

	// Initialising commando:- Lijn
	cmd1 = InitCommand(2, 1);
	ClearMods(cmd1);
	SetModifier(cmd1, 107, "<None>");
	SetModifier(cmd1, 111, "<None>");
	SetModifier(cmd1, 152, "<None>");
	SetModifier(cmd1, 153, "<None>");
	// Instellen van 'Kleur'
	SetModifier(cmd1, 1, "Goud|21");
	// Instellen van 'Laag'
	SetModifier(cmd1, 3, "Geometrie");
	// Instellen van 'Stijl'
	SetModifier(cmd1, 2, "Massief|0");
	gdh1 = InitDigInfo();
	// Vrije selectie toevoegen aan selectie-invoer
	AddFreeDig(gdh1, "X"+0+"Y"+0+"Z"+0);
	// Vrije selectie toevoegen aan selectie-invoer
	AddFreeDig(gdh1, "X"+100);
	// Invoer beëindigen
	AddFinishDig(gdh1 , _FINISH);
	cmdret = ExecCommand(cmd1, gdh1);
	FreeDigInfo(gdh1);
	
	return result;
}