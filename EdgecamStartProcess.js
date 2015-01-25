
function RunProcess(EXEpath, EXEargument, WaitForExit) {
	// Initialising commando:- Proces starten
    cmd1 = InitCommand(2, 102);
    ClearMods(cmd1);
    // Instellen van 'Pad naar programma^Bladeren...'
    SetModifier(cmd1, 76, EXEpath);
    // Instellen van 'Opdrachtprompt'
    SetModifier(cmd1, 81, EXEargument);
    // Instellen van 'Wacht'
    SetModifier(cmd1, 75, WaitForExit);
    cmdret = ExecCommand(cmd1, -1);
}

