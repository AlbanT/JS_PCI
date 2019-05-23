/// <reference path="f:\program files\vero software\edgecam 2020.0\cam\PCI\pci-vsdoc.js" />
/*
        _______ _____   ______    _            _____ _______ 
     /\|__   __/ ____| |  ____|  | |          |_   _|__   __|
    /  \  | | | (___   | |__   __| | __ _  ___  | |    | |   
   / /\ \ | |  \___ \  |  __| / _` |/ _` |/ _ \ | |    | |   
  / ____ \| |  ____) | | |___| (_| | (_| |  __/_| |_   | |   
 /_/    \_\_| |_____/  |______\__,_|\__, |\___|_____|  |_|   
                                     __/ |                   
                                    |___/                    
TODO Fill in these parameters:									
Programmer		:	Alban Tilanus (support@ats-edgeIT.com)
Company			:	ATS EdgeIT
Version			:	20190523
	
Description		:	JS PCI script to find and replace part of the paths to holder and tooling graphics in the current Edgecam toolstore database
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.									
*/
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------
var Query;

// preset PCI variables used in the dialog
SetPCIVariable("$Original", "\\OldServer");
SetPCIVariable("$New", "\\NewServer");
SetPCIVariable("_Check_Tool", 1);
SetPCIVariable("_Check_Holder", 1);

alert("Make sure you made a backup of the current toolstore!!!!");

//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
main();
//---------------------------------------------------------------

function main() {
	if (showDialog() == _FINISH) {
		if (GetPCIvariable("_Check_Tool") == true){
			Query = "UPDATE [dbo].[TS_TOOL] SET [TL_TOOL_GRAPHIC_FILE] = REPLACE(TL_TOOL_GRAPHIC_FILE, '" + GetPCIVariable("$Original") + "', '" + GetPCIVariable("$New") + "')";
			ExecuteUpdateQuery(Query);
		}
		if (GetPCIvariable("_Check_Holder") == true){
			Query = "UPDATE [dbo].[TS_MOUNTING] SET [MNT_TOOL_GRAPHIC_FILE] = REPLACE(MNT_TOOL_GRAPHIC_FILE, '" + GetPCIVariable("$Original") + "', '" + GetPCIVariable("$New") + "')";
			ExecuteUpdateQuery(Query);
		}
	}
}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------

function showDialog(){
    // Build the dialog
    var OpID = InitOperation("Update the CSV path in the toolstore", "", 0);
    AddUserModToOperation(OpID, "$Original", "Original path", "", 0, "");   
    AddUserModToOperation(OpID, "$New", "New path", "", 0, "");   
    AddUserModToOperation(OpID, "_Check_Tool", "Tool illustration", "", 0, ""); 
    AddUserModToOperation(OpID, "_Check_Holder", "Holder illustration", "", 0, ""); 
    var nOpRet = DoOperationMods(OpID);
    return nOpRet; 
}

function ExecuteUpdateQuery(Query) {
	//ActiveX control
	var connection = new ActiveXObject("ADODB.Connection") ;
	var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
	connection.Open(connectionstring);
	var rs = new ActiveXObject("ADODB.Recordset");

	connection.execute(Query)

	//close the connections between the macro and the SQL server
	connection.close;
}