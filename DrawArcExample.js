// Initialising command:- Boog
cmd1 = InitCommand(2, 2);
ClearMods(cmd1);
// Setting modifier 'Starthoek'
SetModifier(cmd1, 6, "0");
// Setting modifier 'Eindhoek'
SetModifier(cmd1, 7, "360");
// Setting modifier 'Radius'
SetModifier(cmd1, 104, "5");
// Setting modifier 'Kleur'
SetModifier(cmd1, 1, "Groen|1");
// Setting modifier 'Laag'
SetModifier(cmd1, 3, "Geometrie");
// Setting modifier 'Stijl'
SetModifier(cmd1, 2, "Massief|0");
gdh1 = InitDigInfo();
// Add Free dig to Selection input data
AddFreeDig(gdh1, "X0Y0Z0");
// Finish input
AddFinishDig(gdh1 ,_FINISH);
cmdret=ExecCommand(cmd1, gdh1);
FreeDigInfo(gdh1);
