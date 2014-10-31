/// <reference path="c:\program files (x86)\planit\edgecam 2014 r2\cam\PCI\pci-vsdoc.js" />

MoveDiag(-50, 12.5, 0, "G0", 1000, 1000, 8500, false);
ToolpathLine(50, 12.5, 0, 1000, 8500);
ToolpathArc(50, -12.5, 0, 62.5, 0, 0, 1000, 8500);
ToolpathLine(-50, -12.5, 0, 1000, 8500);
ToolpathLine(-50, -12.5, 0, 1000, 8500);
ToolpathArc(-50, 12.5, 0, -62.5, 0, 0, 1000, 8500);

function MoveDiag(X, Y, Z, G1G0, Fxy, Fz, S, Debug) {
	/// <summary>
	/// Insert a G1 or G0 movement with a dialog
	/// </summary>
	/// <param name="X">X coord for endpoint of lineair movement</param>
	/// <param name="Y">Y coord for endpoint of lineair movement</param>
	/// <param name="Z">Z coord for endpoint of lineair movement</param>
	/// <param name="G1G0">"G1" for feedmove and "G0" for rapid</param>
	/// <param name="Fxy">Feedrate in mm/min</param>
	/// <param name="Fz">Plunge feedrate in mm/min</param>
	/// <param name="S">Speed in RPM</param>
	/// <param name="Debug">true to show the dialog on execution and false for hiding the dialog</param>

	cmd1 = InitCommand(101, 80);
	ClearMods(cmd1)

	if (G1G0 == "G0") {
		SetModifier(cmd1, 59, 0);
	}
	else if (G1G0 == "G1") {
		SetModifier(cmd1, 59, 1);
		SetModifier(cmd1, 5, Fxy);
		SetModifier(cmd1, 7, Fz); ;
	}

	SetModifier(cmd1, 6, S);
	SetModifier(cmd1, 101, X);
	SetModifier(cmd1, 102, Y);
	SetModifier(cmd1, 103, Z);
	
	
	if (Debug == true) {
		nRet = AskMods(cmd1);
	}
	
	cmdret = ExecCommand(cmd1, -1);
}

function ToolpathLine(Xe, Ye, Ze, F, S) {
	/// <summary>
	/// Insert a G1 movement
	/// </summary>
	/// <param name="X">X coord for endpoint of lineair movement</param>
	/// <param name="Y">Y coord for endpoint of lineair movement</param>
	/// <param name="Z">Z coord for endpoint of lineair movement</param>
	/// <param name="F">Feedrate mm/min</param>
	/// <param name="S">Speed in RPM</param>

	cmd1 = InitCommand(101, 2);
	ClearMods(cmd1);
	SetModifier(cmd1, 5, F);
	SetModifier(cmd1, 6, F);
	SetModifier(cmd1, 7, S);
	SetModifier(cmd1, 77, "Geen|0");
	gdh1 = InitDigInfo();
	BeginDigArray(gdh1, _FREEDIG);
	AddDigInfoCoordStr(_DIG_3DSNAP, "X" + Xe + "Y" + Ye + "Z" + Ze);
	AddDigArray(gdh1);
	AddFinishDig(gdh1, _FINISH);
	cmdret = ExecCommand(cmd1, gdh1);
	FreeDigInfo(gdh1);
}

function ToolpathArc(Xe, Ye, Ze, X1, Y1, Z1, F, S) {
	/// <summary>
	/// Insert an G2 or G3 movement
	/// </summary>
	/// <param name="Xe">X coord Arc endpoint</param>
	/// <param name="Ye">Y coord Arc endpoint</param>
	/// <param name="Ze">Z coord Arc endpoint</param>
	/// <param name="X1">X coord point on arc</param>
	/// <param name="Y1">Y coord point on arc</param>
	/// <param name="Z1">Z coord point on arc</param>
	/// <param name="F">Feedrate mm/min</param>
	/// <param name="S">Speed in RPM</param>

	cmd1 = InitCommand(101, 3);
	ClearMods(cmd1);
	SetModifier(cmd1, 124, "<Yes>");
	SetModifier(cmd1, 5, F);
	SetModifier(cmd1, 7, S);
	SetModifier(cmd1, 77, "Geen|0");
	gdh1 = InitDigInfo();

	// Point on arc
	BeginDigArray(gdh1, _FREEDIG);
	AddDigInfoCoordStr(_DIG_3DSNAP, "X" + X1 + "Y" + Y1 + "Z" + Z1);
	AddDigArray(gdh1);

	// Arc endpoint
	BeginDigArray(gdh1, _FREEDIG);
	AddDigInfoCoordStr(_DIG_3DSNAP, "X" + Xe + "Y" + Ye + "Z" + Ze);
	AddDigArray(gdh1);

	cmdret = ExecCommand(cmd1, gdh1);
	FreeDigInfo(gdh1);
}
