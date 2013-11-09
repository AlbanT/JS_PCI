var OpID = InitOperation("Roughing Strategy", "", 0);
    //initialize "add milling tool"
    var CmdTstore = InitCommand(36, 108); 
    ClearMods(CmdTstore);
    //set tooltype to "corner mill"
    SetModifier(CmdTstore, 140, "0");  
    
    // add the toolstore browse button to the operation
    var nRet=AddCmdModToOperation(OpID, CmdTstore, 180 , "General^Tool" , 0 , "");
    
    //Sets up ToolStore to be ready to return values into modifiers contained in the PCI-JS
    SetCallBack("tsMillTool" ,OpID  , CmdTstore, 180);
    
    // add checkbox to activate/deactivate toolstore browse button
    AddUserModToOperation(OpID, "_check_MyModifier", "Use Tstore", "General^Tool", 0, "");
    
    // the checkbox _check_MyModifier=1 causes the browse button to be disabled
    AddValidStateCmdMod(OpID, "_check_MyModifier", 0 , CmdTstore, 180, 0);
var nOpRet = DoOperationMods(OpID);