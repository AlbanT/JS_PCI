/// <reference path="c:\program files (x86)\planit\edgecam 2012 r2\cam\PCI\pci-vsdoc.js" />
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
AddDigInfoEntnoDig(GetPCINumber("&baseent")+3, _DIG_3DSNAP, _DIR_REVERSE);
// Wereldco�rdinaten selectie X, Y, Z
AddDigInfoRelWorld(357.639, 20.2255);
AddDigArray(gdh1);
BeginDigArray(gdh1, _ENTITYDIG);
// Elementselectie, nummer, eigenschappen (3DSnap JA ketting NEE), richting Vooruit
AddDigInfoEntnoDig(GetPCINumber("&baseent")+4, _DIG_3DSNAP, _DIR_FORWARD);
// Wereldco�rdinaten selectie X, Y, Z
AddDigInfoRelWorld(272.862, 12.5156);
// Invoer be�indigen
AddDigArray(gdh1);
AddFinishDig(gdh1 , _FINISH);
cmdret = ExecCommand(cmd1, gdh1);
FreeDigInfo(gdh1);
