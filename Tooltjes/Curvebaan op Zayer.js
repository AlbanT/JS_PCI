/// <reference path="c:\program files (x86)\vero software\edgecam 2015 r2\cam\PCI\pci-vsdoc.js" />
/*	curvebaan op zayer.js

Programmer		:	A.S. Tilanus (alban.tilanus@ats-global.com)
Company			:	ATS EdgeIT
Version			:	20160411
	
Description		:	Example on how the machining of a curvedrum could be automated using JS PCI scripting
	
Prerequisites	:	<any special things that are needed to run this macro>

Keywords		:	<any keywords. Seperated by a semicolumn ;>

Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


AskBox(["Curvedrum hoek", "B-as hoek", "Vrijloop", "Terugtrek", "Curvebaan diepte", "Grote radius curvedrum", "Hoogte startgat", "Lineaire inlooplengte (0 voor inzakken)"], ["Curvebaan[0]", "Curvebaan[1]", "Curvebaan[2]", "Curvebaan[3]", "Curvebaan[7]", "Curvebaan[8]", "Curvebaan[9]", "Curvebaan[10]"]);
var VolgCurveEntNo = CreateVolgCurve();                 // asks the user to select the geometry to serve as leadcurve
var DrumAngle = GetPCINumber("Curvebaan[0]");           
var Baxis = GetPCINumber("Curvebaan[1]");
var Clearance = GetPCINumber("Curvebaan[2]");
var Retract = GetPCINumber("Curvebaan[3]");
var Depth = -1 * Math.abs(GetPCINumber("Curvebaan[7]"))
var MajorRad = GetPCINumber("Curvebaan[8]");
var StartHoleY = GetPCINumber("Curvebaan[9]");
var LinLead = GetPCINumber("Curvebaan[10]");


var VolgvlakEntNo = CreateVolgvlak();                   // Create a surface to be used as follow surface

CreateCPL(DrumAngle,MajorRad);                          // Create the CPL perpendicular to the curvedrum face
//ActivateCPL("Curvedrum");                               
Indexeren("Curvedrum");                                 // Add an indexmove to the newly created CPL
P8000(Baxis);                                           // Customer specific M-code

if (LinLead == 0) {
    Stotterboren();                                     // PeckDrill the starthole
}

CurvebaanFrezen();                                      // Create the toolpath for the curve


// ********************** BELOW HERE ARE ONLY FUNCTIONS ***************************************************

function CreateVolgCurve() {
    var result = GetPCINumber("&NEXTENT");
    cmd1 = InitCommand(50, 141);
    ClearMods(cmd1);
    // Instellen van 'Kleur'
    SetModifier(cmd1, 1, "Lila|10");
    // Instellen van 'Laag'
    SetModifier(cmd1, 3, "Volgvlak");
    // Instellen van 'Stijl'
    SetModifier(cmd1, 2, "Massief|0");
    // Instellen van 'Naam'
    SetModifier(cmd1, 242, "Volgcurve");
    // Instellen van 'Kopieer vanaf'
    SetModifier(cmd1, 100, "Randen|0");
    cmdret = ExecCommand(cmd1, -1);

    return result;
}

function CreateVolgvlak() {
    ActivateCPL("[&TOP]");

    var Length = 0.9 * (MajorRad / Math.cos(AngleInRadians(90 - DrumAngle)));

    var E1 = GetPCINumber("&NEXTENT");
    cmd1 = InitCommand(2, 1);
    ClearMods(cmd1);
    SetModifier(cmd1, 155, "<Yes>");
    SetModifier(cmd1, 107, "<None>");
    SetModifier(cmd1, 111, "<None>");
    SetModifier(cmd1, 152, "<None>");
    SetModifier(cmd1, 153, "<None>");
    SetModifier(cmd1, 1, "Lila|10");
    SetModifier(cmd1, 3, "Volgvlak");
    SetModifier(cmd1, 2, "Massief|0");
    gdh1 = InitDigInfo();
    AddFreeDig(gdh1, "X" + MajorRad + "Y" + 0 + "Z" + 0);
    AddFreeDig(gdh1, "A" + (90 + DrumAngle) + "R" + Length);
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);

    var E2 = GetPCINumber("&NEXTENT");
    cmd1 = InitCommand(2, 1);
    ClearMods(cmd1);
    SetModifier(cmd1, 155, "<Yes>");
    SetModifier(cmd1, 107, "<None>");
    SetModifier(cmd1, 111, "<None>");
    SetModifier(cmd1, 152, "<None>");
    SetModifier(cmd1, 153, "<None>");
    SetModifier(cmd1, 1, "Lila|10");
    SetModifier(cmd1, 3, "Volgvlak");
    SetModifier(cmd1, 2, "Massief|0");
    gdh1 = InitDigInfo();
    AddFreeDig(gdh1, "X" + 0 + "Y" + 0 + "Z" + 0);
    AddFreeDig(gdh1, "IY100");
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);

    var VolgvlakEntNo = GetPCINumber("&NEXTENT");
    cmd1 = InitCommand(2, 19);
    ClearMods(cmd1);
    // Instellen van 'Start Hoek'
    SetModifier(cmd1, 6, "0");
    // Instellen van 'Eind Hoek'
    SetModifier(cmd1, 7, "360");
    // Instellen van 'Kleur'
    SetModifier(cmd1, 1, "Lila|10");
    // Instellen van 'Laag'
    SetModifier(cmd1, 3, "Volgvlak");
    // Instellen van 'Stijl'
    SetModifier(cmd1, 2, "Massief|0");
    // Instellen van 'Naam'
    SetModifier(cmd1, 242, "volgvlak");
    // Instellen van 'Nauwkeurigheid'
    SetModifier(cmd1, 38, "");
    // Instellen van 'U Raster'
    SetModifier(cmd1, 33, "4");
    // Instellen van 'V Raster'
    SetModifier(cmd1, 34, "4");
    // Instellen van 'U Punten'
    SetModifier(cmd1, 35, "40");
    // Instellen van 'V Punten'
    SetModifier(cmd1, 36, "40");
    gdh1 = InitDigInfo();
    // Elementselectie toevoegen op nummer, 3DSnap JA richtingVooruit (Topology ID)
    AddEntnoDig(gdh1, E1, _DIR_FORWARD, _DIG_3DSNAP);
    // Elementselectie toevoegen op nummer, 3DSnap JA richtingAchteruit (Topology ID)
    AddEntnoDig(gdh1, E2, _DIR_REVERSE, _DIG_3DSNAP);
    // Invoer beëindigen
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);


    // Initialising commando:- Oppervlakken Groep
    cmd1 = InitCommand(2, 77);
    ClearMods(cmd1);
    // Instellen van 'Zijde'
    SetModifier(cmd1, 167, "Bovenzijde|1");
    // Instellen van 'Kleur'
    SetModifier(cmd1, 1, "Lila|10");
    // Instellen van 'Laag'
    SetModifier(cmd1, 3, "Volgvlak");
    // Instellen van 'Stijl'
    SetModifier(cmd1, 2, "Massief|0");
    gdh1 = InitDigInfo();
    // Elementselectie toevoegen op naam, 3DSnap JA richting Vooruit (Topology ID)
    AddEntnoDig(gdh1, VolgvlakEntNo, _DIR_FORWARD, _DIG_3DSNAP);
    // Invoer beëindigen
    AddFinishDig(gdh1, _FINISH);
    // Vrije selectie toevoegen aan selectie-invoer
    AddFreeDig(gdh1, "X" + 100000 + "Y" + 0 + "Z" + 0);
    // Invoer beëindigen
    AddFinishDig(gdh1, _FINISH);
    // Invoer beëindigen
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);

    // Initialising commando:- Lagen
    cmd1 = InitCommand(16, 73);
    ClearMods(cmd1);
    SetModifier(cmd1, 51, "<None>");
    // Instellen van 'Verwijderen'
    SetModifier(cmd1, 52, "Volgvlak;");
    cmdret = ExecCommand(cmd1, -1);

    return  GetPCINumber("&NEXTENT") - 1;
}

function AngleInRadians(angle) {
    return angle * (Math.PI / 180);
}

function AngleInDegrees(angle) {
    return angle * (180 / Math.PI);
}

function CreateCPL(Angle, Radius) {
    // CPL aanmaken
    cmd1 = InitCommand(2, 61);
    ClearMods(cmd1);
    SetModifier(cmd1, 242, "Curvedrum");
    SetModifier(cmd1, 100, "Frezen(XY)|0");
    SetModifier(cmd1, 101, "3D|1");
    SetModifier(cmd1, 246, "<None>");
    SetModifier(cmd1, 164, "<Yes>");
    SetModifier(cmd1, 238, "");
    SetModifier(cmd1, 244, "[&TOP]");
    SetModifier(cmd1, 117, "<None>");
    SetModifier(cmd1, 236, "");
    SetModifier(cmd1, 21, -1 * Angle);
    gdh1 = InitDigInfo();
    AddFreeDig(gdh1, "Z" + Radius + "X" + 0 + "Y" + 0);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
}

function ActivateCPL(CPLname) {
    // CPL
    cmd1 = InitCommand(16, 61);
    ClearMods(cmd1);
    SetModifier(cmd1, 244, CPLname);
    cmdret = ExecCommand(cmd1, -1);
}

function Indexeren(CPLname) {
	// Indexeren
	cmd0 = InitCommand(23, 43);
	ClearMods(cmd0);
	SetModifier(cmd0, 208, "Kortste|0");
	SetModifier(cmd0, 212, "Absoluut|1");
	SetModifier(cmd0, 244, CPLname);
	SetModifier(cmd0, 195, "Radius|3");
	SetModifier(cmd0, 198, MajorRad + Clearance);
	nRet = ExecCommand(cmd0, -1);
}

function P8000(angle) {
    // Initialising commando:- P8000
    cmd0 = InitCommand(7, 148);
    ClearMods(cmd0);
    // Instellen van 'B angle'
    SetModifier(cmd0, 202, angle);
    nRet = ExecCommand(cmd0, -1);
}

function Stotterboren() {
    // Initialising commando:- Gat
    cmd0 = InitCommand(36, 110);
    ClearMods(cmd0);
    SetModifier(cmd0, 92, "Draadmodel|1");
    SetModifier(cmd0, 100, "Spaanbreken|2");
    SetModifier(cmd0, 6, "200");
    SetModifier(cmd0, 7, "1800");
    SetModifier(cmd0, 77, "Gebruiker|0");
    SetModifier(cmd0, 103, "<Yes>");
    SetModifier(cmd0, 162, "");
    // Instellen van 'Vrijloop'
    SetModifier(cmd0, 28, Clearance);
    // Instellen van 'Terugtrek'
    SetModifier(cmd0, 29, Retract);
    // Instellen van 'Startvlak'
    SetModifier(cmd0, 161, 0);
    // Instellen van 'Diepte'
    SetModifier(cmd0, 9, Depth);
    // Instellen van 'Snede opdeling'
    SetModifier(cmd0, 10, "4");
    // Instellen van 'Optimaliseer volgorde'
    SetModifier(cmd0, 114, "Terug naar start|1");
    // Instellen van 'Startpositie'
    SetModifier(cmd0, 45, "Huidige positie|0");
    // Instellen van 'Filtering'
    SetModifier(cmd0, 170, "");
    // Instellen van 'Tolerantie'
    SetModifier(cmd0, 62, "0.01");
    // Instellen van 'Helicodaal'
    SetModifier(cmd0, 230, "");
    // Instellen van 'Radiuscompensatie'
    SetModifier(cmd0, 26, "Geen|1");

    gdh1 = InitDigInfo();
    AddFreeDig(gdh1, "X0Z0Y" + StartHoleY);
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd0, gdh1);
    FreeDigInfo(gdh1);
}

function CurvebaanFrezen() {
    // Initialising commando:- Simultaan frezen
    cmd1 = InitCommand(22, 143);
    ClearMods(cmd1);
    // Instellen van 'Strategie'
    SetModifier(cmd1, 32, "Projecteer curve|5");
    // Instellen van 'Bewerkingsrichting'
    SetModifier(cmd1, 253, "Tegen de klok in|1");
    // Instellen van 'Startpositie'
    SetModifier(cmd1, 45, "<Yes>");
    // Instellen van 'Gewenste rotatierichting'
    SetModifier(cmd1, 27, "Automatisch|1");
    // Instellen van 'Gereedschap contactpunt'
    SetModifier(cmd1, 49, "Middelpunt|2");
    // Instellen van 'Hoeken afronden'
    SetModifier(cmd1, 155, "0.0");
    // Instellen van 'Kettingtolerantie'
    SetModifier(cmd1, 30, "1");
    // Instellen van 'Tolerantie'
    SetModifier(cmd1, 24, "0.01");
    // Instellen van 'Maximale punt tussenafstand'
    SetModifier(cmd1, 25, "5000");
    // Instellen van 'Diepte'
    SetModifier(cmd1, 85, "");
    // Instellen van 'Vrijlooptype'
    SetModifier(cmd1, 138, "Cilinder|2");
    // Instellen van 'Richting (vlak/cilinder)'
    SetModifier(cmd1, 139, "Y|2");
    // Instellen van 'Vrijloop radius'
    SetModifier(cmd1, 141, RealClearance(Clearance));
    // Instellen van 'Terugtrekafstand'
    SetModifier(cmd1, 143, Clearance + Math.abs(Depth));
    // Instellen van 'Verschuiving langs gereedschaps-as'
    SetModifier(cmd1, 8, Depth);
    // Instellen van 'Gedrag bij polen'
    SetModifier(cmd1, 276, "Forceer tafelrotatie|5");
    // Instellen van 'Polaire hoek-tolerantie'
    SetModifier(cmd1, 112, "0.01");
    // Instellen van 'Type interpolatie'
    SetModifier(cmd1, 280, "Per vector|1");
    // Instellen van 'Gereedschaps-as besturing'
    SetModifier(cmd1, 50, "");
    // Instellen van 'Uitvoer type'
    SetModifier(cmd1, 51, "4-Assig|2");
    // Instellen van '4e as'
    SetModifier(cmd1, 52, "Y|2");
    // Instellen van 'Kantel strategie'
    SetModifier(cmd1, 53, "Normaal|1");
    // Instellen van 'Blokkeer 5e as op'
    SetModifier(cmd1, 237, DrumAngle);
    // Instellen van 'Negeer lineaire limieten'
    SetModifier(cmd1, 78, "<Yes>");
    // Instellen van 'Controle 1 && 2'
    SetModifier(cmd1, 176, "");
    // Instellen van 'Controleer'
    SetModifier(cmd1, 186, "Geen|0");
    // Instellen van 'Controleer'
    SetModifier(cmd1, 203, "Geen|0");
    // Instellen van 'Controle 3 && 4'
    SetModifier(cmd1, 236, "");
    // Instellen van 'Controleer'
    SetModifier(cmd1, 221, "Geen|0");
    // Instellen van 'Controleer'
    SetModifier(cmd1, 239, "Geen|0");
    // Instellen van 'In-/Uitloop'
    SetModifier(cmd1, 117, "");
    // Instellen van 'Type'
    SetModifier(cmd1, 189, "Geen|1");
    // Instellen van 'Hoogte'
    SetModifier(cmd1, 122, "0.0");
    // Instellen van 'Start verlenging'
    SetModifier(cmd1, 158, "0.0");
    // Instellen van 'Eind verlenging'
    SetModifier(cmd1, 159, "0.0");
    // Instellen van 'Verbindingsbewegingen'
    SetModifier(cmd1, 97, "");
    // Instellen van 'Korte verbindingsbewegingen'
    SetModifier(cmd1, 102, "Recht|0");
    // Instellen van 'Max. lengte korte verbindingsbeweging'
    SetModifier(cmd1, 113, "1");
    // Instellen van 'Lange verbindingsbewegingen'
    SetModifier(cmd1, 201, "Vrijloop|1");
    // Instellen van 'Veiligheidsafstand'
    SetModifier(cmd1, 144, "40");
    // Instellen van 'Korte overbruggingen'
    SetModifier(cmd1, 200, "Recht|0");
    // Instellen van 'Lange overbruggingen'
    SetModifier(cmd1, 205, "Recht|0");
    // Instellen van 'Lengte korte overbrugging'
    SetModifier(cmd1, 206, "1");
    // Instellen van 'Voedingssnelheden'
    SetModifier(cmd1, 9, "");
    // Instellen van 'Voeding'
    SetModifier(cmd1, 5, "128");
    // Instellen van 'Inzakvoeding'
    SetModifier(cmd1, 6, "128");
    // Instellen van 'Snelheid'
    SetModifier(cmd1, 7, "1400");
    // Instellen van 'Technologie'
    SetModifier(cmd1, 77, "Gebruiker|0");
    // Instellen van 'Meerdere banen'
    SetModifier(cmd1, 145, "");
    // Instellen van 'Ruwdeel'
    SetModifier(cmd1, 165, "Geen|0");
    // Instellen van 'Sorteer op'
    SetModifier(cmd1, 217, "Sneden|1");
    // Instellen van 'Sorteer op'
    SetModifier(cmd1, 223, "Sneden|1");
    // Instellen van 'Strategie'
    SetModifier(cmd1, 227, "Geen|1");
    // Instellen van '% Overlap'
    SetModifier(cmd1, 225, "50");
    // Instellen van 'As/Richting'
    SetModifier(cmd1, 259, "X|1");
    // Instellen van 'Starthoek'
    SetModifier(cmd1, 261, "0.0");
    // Instellen van 'Rotatiehoek'
    SetModifier(cmd1, 262, "0.0");
    // Instellen van 'Startafstand'
    SetModifier(cmd1, 263, "0.0");
    // Instellen van 'Stapgrootte'
    SetModifier(cmd1, 264, "0.0");
    // Instellen van 'Sorteer op'
    SetModifier(cmd1, 265, "Volledige ger.baan|1");
    // Instellen van '% Gereedschapsbaan'
    SetModifier(cmd1, 268, "100");
    // Instellen van 'Verbindingen toepassen'
    SetModifier(cmd1, 266, "Voor rotatie|1");
    // Instellen van 'Ruwdeelvorm toepassen'
    SetModifier(cmd1, 267, "Voor rotatie|1");
    gdh1 = InitDigInfo();
    // Elementselectie toevoegen op naam, 3DSnap JA richting Vooruit (Topology ID)
    // AddEntNameDig(gdh1, "hartlijn curve", _DIR_FORWARD, _DIG_3DSNAP + _DIG_TANGENT + _DIG_2DCHAIN);
AddEntnoDig(gdh1, VolgCurveEntNo, _DIR_FORWARD, _DIG_3DSNAP + _DIG_TANGENT + _DIG_2DCHAIN);
    // Invoer beëindigen
    AddFinishDig(gdh1, _FINISH);
    // Vrije selectie toevoegen aan selectie-invoer
    AddFreeDig(gdh1, "X" + 0 + "Y" + StartHoleY + "Z" + 0);
    // Elementselectie toevoegen op nummer, 3DSnap JA richtingVooruit (Topology ID)
    AddEntnoDig(gdh1, VolgvlakEntNo, _DIR_FORWARD, _DIG_3DSNAP + _DIG_TANGENT + _DIG_2DCHAIN);
    // Invoer beëindigen
    AddFinishDig(gdh1, _FINISH);
    // Invoer beëindigen
    AddFinishDig(gdh1, _FINISH);


    if (LinLead > 0) {
        // Instellen van 'Type'
        SetModifier(cmd0, 189, "Lineair Tangentiaal|5");
        // Instellen van 'Lengte'
        SetModifier(cmd0, 125, LinLead);
        // Instellen van 'Hoogte'
        SetModifier(cmd0, 122, "0.0");
        // Instellen van 'Lengte'
        SetModifier(cmd0, 135, LinLead);
    }

    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
}

function RealClearance(Clearance) {
    return Math.sqrt((MajorRad * MajorRad) - (StartHoleY * StartHoleY)) + Clearance;
}
