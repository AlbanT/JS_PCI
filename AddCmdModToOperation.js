var Overlap = GetPCIVariable( "Overlap" );

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
    
    // add the other fields to the operation
    AddUserModToOperation(OpID, "Overlap", "Overlap (%)", "General^Strategy", 0, "");   
    AddUserModToOperation(OpID, "_CheckSlice", "Slice", "General^Strategy", 0, ""); 
var nOpRet = DoOperationMods(OpID);

if(nOpRet!=_FINISH) {
    alert("User canceled the operation"); 
	FreeCommand(CmdTstore);  // release initialized command
    }
else {
    GetModifier(CmdTstore, 180, "$StrategyToolName");
    ExecCommand(CmdTstore, -1);
    
    ShowResultInEdgecam();
}

function ShowResultInEdgecam()
{
    var CheckBoxResult = "FALSE";
    if (GetPCIVariable("_CheckSlice")==1) {
        CheckBoxResult = "TRUE";
    }
    alert("The selected tool is " + GetPCIVariable("$StrategyToolName") + "\n" + "Overlap is set to " + GetPCIVariable("Overlap") + "%" + "\n" + "The Slice checkbox is set to " + CheckBoxResult);
}