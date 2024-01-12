/* usage example for GetInitialCplPlugin:
	Because there is no way of retrieving the initial workdatum using JS PCI
	this plugin can be used to retreive the initial cpl.
	
	Make sure an Adv. Customisation license is available and that the GetInitialCplPlugin.dll
	is correctly placed inside the EDGECAM plugins folder!!!!
*/

alert(
    "function output: " +
        GetInitialCpl() +
        "\n" +
        "PCI variable output: " +
        GetPCIVariable("$InitialCPL")
);

function GetInitialCpl() {
    // Initialising command:- Plugin
    var cmd1 = InitCommand(50, 666);
    ClearMods(cmd1);
    // Setting modifier 'Name'
    SetModifier(cmd1, 14, "GetInitialCplPlugin");
    var cmdret = ExecCommand(cmd1, -1);

    return GetPCIVariable("$InitialCPL");
}
