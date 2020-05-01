/// <reference path="f:\program files\hexagon\edgecam 2020.1\cam\PCI\pci-vsdoc.js" />
/*
        _______ _____   ______    _            _____ _______ 
     /\|__   __/ ____| |  ____|  | |          |_   _|__   __|
    /  \  | | | (___   | |__   __| | __ _  ___  | |    | |   
   / /\ \ | |  \___ \  |  __| / _` |/ _` |/ _ \ | |    | |   
  / ____ \| |  ____) | | |___| (_| | (_| |  __/_| |_   | |   
 /_/    \_\_| |_____/  |______\__,_|\__, |\___|_____|  |_|   
                                     __/ |                   
                                    |___/                    
								
Programmer		:	Alban Tilanus (alban.tilanus@ats-global.com)
Company			:	ATS EdgeIT
Version			:	V1
	
Description		:	Simpel script om een groef te steken die even breed is als de steekbeitel. Indien afschuining > 0 wordt een afschuining toegevoegd ZONDER neusradius correctie.
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.									
*/

SetPCIVariable("ToolWidth" , GetAttribute("Tool.Insert.Grooving.Width"));

nret = AskBox(["Vrijloop radius","Start radius", "Radius bodem groef", "Z positie groef", "voeding", "snelheid", "afschuining", "beitelbreedte", "stuurpunt achter"],["Xclearance","Xstart","Xgroove", "Zstart", "feedrate", "speed", "afschuining", "ToolWidth", "_checkStuurpuntAchter"]);

if (nret == _FINISH) {

	var bStuurpuntAchter = GetPCINumber("_checkStuurpuntAchter");
	var Xclearance = 2 * GetPCINumber("Xclearance");
	var Xstart = 2 * GetPCINumber("Xstart");
	var Xgroove = 2 * GetPCINumber("Xgroove");
	var Zstart = GetPCINumber("Zstart");
	var feedrate = GetPCINumber("feedrate");
	var speed = GetPCINumber("speed");
	var afschuining = Math.abs(GetPCINumber("afschuining"));
	var ToolWidth = GetPCINumber("ToolWidth");
	
	if (bStuurpuntAchter == 1) {
		Zstart = Zstart + ToolWidth;
	}
	

	var retract = 1;
	var Xsafe = Xstart + retract;


	// Initialising command:- IJlgang
	var cmd1 = InitCommand(101, 1); 
	ClearMods(cmd1); 
	var gdh1 = InitDigInfo();

	BeginDigArray(gdh1, _FREEDIG);
	// Typed Coordinates 3D Snap JA, coordinate string
	AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xclearance + "Z" + Zstart);
	AddDigArray(gdh1);

	BeginDigArray(gdh1, _FREEDIG);
	// Typed Coordinates 3D Snap JA, coordinate string
	AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xsafe + "Z" + Zstart);
	AddDigArray(gdh1);

	// Finish input
	AddFinishDig(gdh1, _FINISH);
	var cmdret = ExecCommand(cmd1, gdh1); 
	FreeDigInfo(gdh1); 

	// Initialising command:- Verplaats In Voeding
	var cmd1 = InitCommand(101, 2); 
	ClearMods(cmd1); 
	// Setting modifier 'Voeding'
	SetModifier(cmd1, 5, feedrate); 
	// Setting modifier 'Snelheid'
	SetModifier(cmd1, 7, speed); 
	var gdh1 = InitDigInfo();

	BeginDigArray(gdh1, _FREEDIG);
	// Typed Coordinates 3D Snap JA, coordinate string
	AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xgroove);
	AddDigArray(gdh1);

	BeginDigArray(gdh1, _FREEDIG);
	// Typed Coordinates 3D Snap JA, coordinate string
	AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xsafe);
	AddDigArray(gdh1);

	// Finish input
	AddFinishDig(gdh1, _FINISH);
	var cmdret = ExecCommand(cmd1, gdh1); 
	FreeDigInfo(gdh1); 

	if (afschuining > 0){
		
		// Initialising command:- Verplaats In Voeding
		var cmd1 = InitCommand(101, 2); 
		ClearMods(cmd1); 
		// Setting modifier 'Voeding'
		SetModifier(cmd1, 5, feedrate); 
		// Setting modifier 'Snelheid'
		SetModifier(cmd1, 7, speed); 
		var gdh1 = InitDigInfo();
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "IZ-" + afschuining);
		AddDigArray(gdh1);
		
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xstart);
		AddDigArray(gdh1);
		
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "IX-" + afschuining + "IZ+" + afschuining);
		AddDigArray(gdh1);
		
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xsafe);
		AddDigArray(gdh1);
		
//		BeginDigArray(gdh1, _FREEDIG);
//		// Typed Coordinates 3D Snap JA, coordinate string
//		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "IZ+" + ToolWidth);
//		AddDigArray(gdh1);
		
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "IZ+" + afschuining);
		AddDigArray(gdh1);
		
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xstart);
		AddDigArray(gdh1);
		
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "IX-" + afschuining + "IZ-" + afschuining);
		AddDigArray(gdh1);
		
		BeginDigArray(gdh1, _FREEDIG);
		// Typed Coordinates 3D Snap JA, coordinate string
		AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xsafe);
		AddDigArray(gdh1);
		
		// Finish input
		AddFinishDig(gdh1, _FINISH);
		var cmdret = ExecCommand(cmd1, gdh1); 
		FreeDigInfo(gdh1); 	
	}

	// Initialising command:- IJlgang
	var cmd1 = InitCommand(101, 1); 
	ClearMods(cmd1); 
	var gdh1 = InitDigInfo();

	BeginDigArray(gdh1, _FREEDIG);
	// Typed Coordinates 3D Snap JA, coordinate string
	AddDigInfoCoordStr(_DIG_3DSNAP+_DIG_TANGENT+_DIG_2DCHAIN, "X" + Xclearance);
	AddDigArray(gdh1);

	// Finish input
	AddFinishDig(gdh1, _FINISH);
	var cmdret = ExecCommand(cmd1, gdh1); 
	FreeDigInfo(gdh1); 
}
