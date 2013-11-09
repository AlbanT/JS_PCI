/// <reference path="c:\program files (x86)\planit\edgecam 2012 r2\cam\PCI\pci-vsdoc.js" />

var BaseEntity = GetPCInumber("&NEXTENT");
var temp;

// Initialising commando:- Lijn
cmd1 = InitCommand(2, 1);
ClearMods(cmd1);
// Instellen van 'Polylijn'
SetModifier(cmd1, 155, "<Yes>");
SetModifier(cmd1, 107, "<None>");
SetModifier(cmd1, 111, "<None>");
SetModifier(cmd1, 152, "<None>");
SetModifier(cmd1, 153, "<None>");
// Instellen van 'Kleur'
SetModifier(cmd1, 1, "Groen|1");
// Instellen van 'Laag'
SetModifier(cmd1, 3, "Geometrie");
// Instellen van 'Stijl'
SetModifier(cmd1, 2, "Massief|0");
gdh1 = InitDigInfo();
// Vrije selectie toevoegen aan selectie-invoer
AddFreeDig(gdh1, "X"+0+"Y"+0+"Z"+0);
// Vrije selectie toevoegen aan selectie-invoer
AddFreeDig(gdh1, "X"+100);
// Vrije selectie toevoegen aan selectie-invoer
AddFreeDig(gdh1, "Y"+50);
// Vrije selectie toevoegen aan selectie-invoer
AddFreeDig(gdh1, "X"+0);
// Vrije selectie toevoegen aan selectie-invoer
AddFreeDig(gdh1, "Y"+0);
// Invoer beëindigen
AddFinishDig(gdh1 , _FINISH);
cmdret = ExecCommand(cmd1, gdh1);
FreeDigInfo(gdh1);


// Initialising commando:- Vloeiing Radius
cmd1 = InitCommand(21, 76);
ClearMods(cmd1);
// Instellen van 'Radius'
SetModifier(cmd1, 113, "10");
// Instellen van 'Eerste'
SetModifier(cmd1, 15, "<Yes>");
// Instellen van 'Tweede'
SetModifier(cmd1, 16, "<Yes>");
// Instellen van 'Kleur'
SetModifier(cmd1, 1, "Groen|1");
// Instellen van 'Laag'
SetModifier(cmd1, 3, "Geometrie");
// Instellen van 'Stijl'
SetModifier(cmd1, 2, "Massief|0");
gdh1 = InitDigInfo();
BeginDigArray(gdh1, _ENTITYDIG);
// Elementselectie, nummer, eigenschappen (3DSnap JA ketting NEE), richting Achteruit
temp=BaseEntity+3
AddDigInfoEntnoDig(temp, _DIG_3DSNAP, _DIR_FORWARD);
// Wereldcoördinaten selectie X, Y, Z
AddDigInfoRelWorld(0, 0);
AddDigArray(gdh1);
BeginDigArray(gdh1, _ENTITYDIG);
// Elementselectie, nummer, eigenschappen (3DSnap JA ketting NEE), richting Vooruit
temp=BaseEntity+0
AddDigInfoEntnoDig(temp, _DIG_3DSNAP, _DIR_FORWARD);
// Wereldcoördinaten selectie X, Y, Z
AddDigInfoRelWorld(0, 0);
// Invoer beëindigen
AddDigArray(gdh1);
AddFinishDig(gdh1 , _FINISH);
cmdret = ExecCommand(cmd1, gdh1);
FreeDigInfo(gdh1);