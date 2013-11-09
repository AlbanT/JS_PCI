/// <reference path="c:\program files (x86)\planit\edgecam 2012 r2\cam\PCI\pci-vsdoc.js" />
function main()
{
SetPackage(1);
if (GetPCIVariable("&3AXMILL") == 0)  //use Number(GetPCIVariable("X")) if necessary
{
	nRet = MessageBox(_MB_ICONERROR, "Ongeldige omgeving");
return 0;
}
cmd0 = InitCommand(11, 87);
ClearMods(cmd0);
SetModifier(cmd0, 199, "PCItemplate");
cmdret = ExecCommand(cmd0, -1);
do{
//
// Initialising commando:- Gereedschap
cmd0 = InitCommand(36, 108);
ClearMods(cmd0);
// Instellen van 'Bibliotheek^Zoeken...'
SetModifier(cmd0, 180, "6.0 mm Multi-Flute End Mill");
// Instellen van ''
SetModifier(cmd0, 155, "");
// Instellen van 'Opmerking'
SetModifier(cmd0, 15, "6.0 MM DIA MULTI-FLUTE END MILL");
// Instellen van ''
SetModifier(cmd0, 154, "");
// Instellen van 'Diameter'
SetModifier(cmd0, 47, "6");
// Instellen van 'Gereedschapstype'
SetModifier(cmd0, 140, "Frees|0");
// Instellen van 'SubType'
SetModifier(cmd0, 188, "Hoekfrees|0");
// Instellen van 'Eenheden'
SetModifier(cmd0, 116, "Millimeters|1");
// Instellen van 'Voeding'
SetModifier(cmd0, 165, "Per Minuut|1");
// Instellen van 'Overig...'
SetModifier(cmd0, 153, "");
// Instellen van 'Snijlengte'
SetModifier(cmd0, 179, "24");
// Instellen van 'Aantal snijkanten'
SetModifier(cmd0, 130, "4");
// Instellen van 'Bereik'
SetModifier(cmd0, 147, "29");
// Instellen van 'Voorbewerken'
SetModifier(cmd0, 176, "<Yes>");
// Instellen van 'Nabewerken'
SetModifier(cmd0, 177, "<Yes>");
// Instellen van 'Vrijloop-type'
SetModifier(cmd0, 195, "Geen|1");
// Instellen van 'Kleur'
SetModifier(cmd0, 125, "5|5");
// Instellen van 'Laag'
SetModifier(cmd0, 126, "Gereedschap.2");
// Instellen van 'Laden'
SetModifier(cmd0, 216, "");
// Instellen van 'Z Afstand'
SetModifier(cmd0, 61, "99");
// Instellen van 'Lengte'
SetModifier(cmd0, 185, "44");
// Instellen van 'Gereedschapsbibliotheek'
SetModifier(cmd0, 158, "");
// Instellen van 'Houder illustratie^Bladeren...'
SetModifier(cmd0, 171, "ISO40-Slim Chuck 1-6mm Dia (70mm).csv");
// Instellen van 'Houder Z toegift'
SetModifier(cmd0, 174, "5");
// Instellen van 'Gebruiker string 1'
SetModifier(cmd0, 169, "EM");
// Instellen van 'Spil'
SetModifier(cmd0, 252, "");
// Instellen van 'Richting'
SetModifier(cmd0, 161, "Vooruit|2");
// Instellen van 'Versnelling'
SetModifier(cmd0, 162, "Auto|0");
// Instellen van 'Max omw per minuut'
SetModifier(cmd0, 163, "10000");
// Instellen van 'Haakse kop'
SetModifier(cmd0, 142, "");
// Instellen van 'Source TS DB'
SetModifier(cmd0, 270, "Provider=SQLNCLI10;Integrated Security=SSPI;DataTypeCompatibility=80;server=M4500-CarlECSQLEXPRESS;database=Sample_Toolstore_2012R2");
// Instellen van 'Mount TS PK'
SetModifier(cmd0, 271, "640");
// Instellen van 'Time TS Mount'
SetModifier(cmd0, 273, "2010-08-29 17:50:36");
// Instellen van 'Time TS Tool'
SetModifier(cmd0, 274, "2009-04-24 12:21:28");
nRet = AskMods(cmd0);
if (nRet!=_FINISH )
{
 return 0; 
}
nRet = ExecCommand(cmd0, -1);
//
}while(nRet==_ESCAPE )
//
// Initialising commando:- Contourfrezen
cmd0 = InitCommand(22, 110);
ClearMods(cmd0);
// Instellen van 'Elementen'
SetModifier(cmd0, 93, "Draadmodel|1");
// Instellen van 'Bewerkingsrichting'
SetModifier(cmd0, 137, "Meelopend|0");
// Instellen van 'NC-code vereenvoudigen'
SetModifier(cmd0, 101, "Geen|0");
// Instellen van 'Tolerantie'
SetModifier(cmd0, 62, "0.001");
// Instellen van 'Meerdere banen'
SetModifier(cmd0, 191, "");
// Instellen van 'Voeding'
SetModifier(cmd0, 199, "");
// Instellen van 'Voeding'
SetModifier(cmd0, 5, "2758.69");
// Instellen van 'Z Voeding'
SetModifier(cmd0, 6, "2758.69");
// Instellen van 'Snelheid'
SetModifier(cmd0, 7, "10610.3");
// Instellen van 'Technologie'
SetModifier(cmd0, 77, "Geen|0");
// Instellen van 'Radiuscorrectie'
SetModifier(cmd0, 216, "");
// Instellen van 'Radiuscorrectie'
SetModifier(cmd0, 21, "Geen|1");
// Instellen van 'Diepte'
SetModifier(cmd0, 197, "");
// Instellen van 'Vrijloopvlak'
SetModifier(cmd0, 28, "5");
// Instellen van 'Startvlak'
SetModifier(cmd0, 161, "0");
// Instellen van 'Diepte'
SetModifier(cmd0, 9, "-3");
// Instellen van 'Snede opdeling'
SetModifier(cmd0, 10, "3");
// Instellen van 'Eindig op'
SetModifier(cmd0, 107, "Vrijloopvlak|2");
// Instellen van 'Beheer'
SetModifier(cmd0, 131, "");
// Instellen van 'Dichtstbijzijnde buur'
SetModifier(cmd0, 95, "<Yes>");
// Instellen van 'Strategie'
SetModifier(cmd0, 208, "Rond|1");
// Instellen van 'Gereedschap beheer'
SetModifier(cmd0, 254, "Gereedsch. midden|0");
// Instellen van 'Start/Eind'
SetModifier(cmd0, 209, "");
// Instellen van 'Z Intredepunt'
SetModifier(cmd0, 210, "Automatisch|0");
// Instellen van 'Terugtrekpunt'
SetModifier(cmd0, 212, "Automatisch|0");
// Instellen van 'Standaardzijde'
SetModifier(cmd0, 140, "Binnenzijde|1");
// Instellen van 'Start/Eindpunt voorkeur'
SetModifier(cmd0, 186, "");
// Instellen van 'Type'
SetModifier(cmd0, 187, "Selecteren|0");
// Instellen van 'Contourverlenging'
SetModifier(cmd0, 116, "");
// Instellen van 'Start'
SetModifier(cmd0, 117, "0.0");
// Instellen van 'Eind'
SetModifier(cmd0, 118, "0.0");
// Instellen van 'Overlap'
SetModifier(cmd0, 119, "0.0");
// Instellen van 'In/uitloop'
SetModifier(cmd0, 135, "");
// Instellen van 'Type'
SetModifier(cmd0, 189, "Horizontaal|1");
// Instellen van '% Voeding'
SetModifier(cmd0, 134, "100");
// Instellen van 'In-/Uitloop gelijk'
SetModifier(cmd0, 11, "<Yes>");
// Instellen van 'Hoek'
SetModifier(cmd0, 24, "90");
// Instellen van 'Inloopradius'
SetModifier(cmd0, 25, "5");
// Instellen van 'Lengte'
SetModifier(cmd0, 136, "0.0");
// Instellen van 'Loodrecht'
SetModifier(cmd0, 213, "0.0");
// Instellen van 'Verbindingsbewegingen'
SetModifier(cmd0, 162, "");
// Instellen van 'Lengte korte verbindingsbeweging'
SetModifier(cmd0, 128, "5");
// Instellen van 'Aanlopen op vrijloopvlak'
SetModifier(cmd0, 98, "<Yes>");
// Instellen van 'Type'
SetModifier(cmd0, 102, "Stapsgewijs|1");
// Instellen van '% Voeding'
SetModifier(cmd0, 129, "100");
// Instellen van 'Type'
SetModifier(cmd0, 103, "Vrijlopend|1");
// Instellen van 'Veiligheidsafstand'
SetModifier(cmd0, 220, "5");
// Instellen van 'Z Voeding'
SetModifier(cmd0, 13, "<Yes>");
// Instellen van 'Rest contourfrezen'
SetModifier(cmd0, 170, "");
// Instellen van 'Diameter vorig gereedschap'
SetModifier(cmd0, 230, "0.0");
nRet = ExecCommand(cmd0, -1);
//

return 0;
}

main();
