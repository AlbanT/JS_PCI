/// <reference path="f:\Program Files\Vero Software\Edgecam 2020.0\cam\PCI\pci-vsdoc.js" />
/*
TODO Fill in these parameters:									
Programmer		:	<PROGRAMMER> (<PROGRAMMER EMAIL>)
Company			:	<COMPANY>
Version			:	<VERSION>
	
Description		:	<DESCRIPTION>
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.	

License		:	"THE BEER-WARE LICENSE" (Revision 42): <PROGRAMMER EMAIL> wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
 */
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------


//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
main();
//---------------------------------------------------------------

function main() {
	// Operation initialisation
	var hOp = InitOperation("Operation name", "", 0);

	// Initializing the digitize handles
	var hDigArray = [];
	first_pick = InitDigInfo();
	hDigArray[0] = first_pick;

	// Add fields to the operation
	AddUserModToOperation(hOp,"Var1","Normal field","Tab1^",0, "");

	// Add a digitize to the operation
	nRet_first_pick = AskDigInfo("pick something",first_pick,_ENTITYDIG + _FREEDIG, "-255","",false);

	// Show the operation dialog
	var nOpRet = DoOperationMods(hOp);

	// Commit the operation to the EDGECAM database and creates a machining command in the instruction list
	CommitOperation(hOp,hDigArray);


	// check the validity of the pick
	if (nRet_first_pick == _FINISH) {
		// user pressed RMB without selecting anything
		MessageBox(_MB_ICONERROR, "Invalid input!");
	}
	else {
		// extract the info from the selected entity
		QueryDigInfo(first_pick,0);

		// use the info
		placeComment(" X" + GetPCIVariable("&XSNAP") + " Y" + GetPCIVariable("&YSNAP") + " Z" + GetPCIVariable("&ZSNAP"));

		// Release the digitize handle
		FreeDigInfo(first_pick);

	}

	// Frees memory used by the PCI operation.
	FreeOperation(hOp);
}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------

function placeComment(comment){
	// Initialising command:- Comment
	cmd0 = InitCommand(7, 108);
	ClearMods(cmd0);
	// Setting modifier 'Comment'
	SetModifier(cmd0, 15, comment);
	nRet = ExecCommand(cmd0, -1);
}


