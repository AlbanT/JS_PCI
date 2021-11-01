/// <reference path="f:\program files\hexagon\edgecam 2021.0\cam\PCI\pci-vsdoc.js" />
/*
        _______ _____   ______    _            _____ _______ 
     /\|__   __/ ____| |  ____|  | |          |_   _|__   __|
    /  \  | | | (___   | |__   __| | __ _  ___  | |    | |   
   / /\ \ | |  \___ \  |  __| / _` |/ _` |/ _ \ | |    | |   
  / ____ \| |  ____) | | |___| (_| | (_| |  __/_| |_   | |   
 /_/    \_\_| |_____/  |______\__,_|\__, |\___|_____|  |_|   
                                     __/ |                   
                                    |___/                    
	
Description		:	Uses a set of available Toolstores to show a dialog that can switch between the Toolstores
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.									
*/
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------

// Declare all Tstores as a JSON object
var Tstores = {
	Tstore:
	[
		{
			Name: "test1",
			Server: "myServername",
			SqlInstance: "ECSQLEXPRESS",
			DbName: "Sample_Toolstore_2018R2",
			TstoreSupportFolder:"c:\\vero software\\2018.20\\edgecam\\cam\\tstore\\"
		},
		{
			Name: "test2",
			Server: "myServername",
			SqlInstance: "ECSQLEXPRESS",
			DbName: "Sample_Toolstore_2018R2",
			TstoreSupportFolder:"c:\\vero software\\2018.20\\edgecam\\cam\\tstore\\"
		},
		{
			Name: "test3",
			Server: "myServername",
			SqlInstance: "ECSQLEXPRESS",
			DbName: "Sample_Toolstore_2018R2",
			TstoreSupportFolder:"c:\\vero software\\2018.20\\edgecam\\cam\\tstore\\"
		}
	]
};

//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
main();
//---------------------------------------------------------------

function main() {

	// create a list to show on the dialog
	var list = "Toolstore:^";
	for (i = 0; i < Tstores.Tstore.length; i++){
		list += Tstores.Tstore[i].Name + "^";
	}

	// create the dialog
	var hOp = InitOperation("Set Toolstore", "", 0);
	AddUserModToOperation(hOp,"_List_Tstore_Id",list,"",0, "");
	var nOpRet = DoOperationMods(hOp);
	FreeOperation(hOp);

	// process the dialog result
	if (nOpRet == _FINISH){
		var TstoreId = GetPCINumber("_List_Tstore_Id") - 1;

		SetTstore(
			Tstores.Tstore[TstoreId].Server, 
			Tstores.Tstore[TstoreId].SqlInstance, 
			Tstores.Tstore[TstoreId].DbName, 
			Tstores.Tstore[TstoreId].TstoreSupportFolder
		)
	}

}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------
function SetTstore(_ServerName, _SqlInstance, _DbName, _TstoreSupportFolder){
	var Tstore = InitCommand(50, 252); 
	SetModifier(Tstore, 100, _ServerName); 
	SetModifier(Tstore, 101, _SqlInstance); 
	SetModifier(Tstore, 102, _DbName); 
	SetModifier(Tstore, 103, _TstoreSupportFolder); 
	return ExecCommand(Tstore, -1); 
}
