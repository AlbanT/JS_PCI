/// <reference path="f:\Program Files\Vero Software\Edgecam 2020.0\cam\PCI\pci-vsdoc.js" />
/*
TODO Fill in these parameters:									
Programmer		:	Alban Tilanus (alban.tilanus@ats-global.com)
Company			:	ATS EdgeIT
Version			:	20200501
	
Description		:	PCI version of the old MultiCPLDelete PDI which was available in the old EC Freeware
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.	

License		:	"THE BEER-WARE LICENSE" (Revision 42): <PROGRAMMER EMAIL> wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
 */
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------
var maxChecksPerTab = 10;

//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
main();
//---------------------------------------------------------------

function main() {
	var cmd1 = InitCommand(10, 61);
	var list = GetModifierList(cmd1, 244);  //list = "-1^Workplane-1^Workplane-2^Workplane-3"
	FreeCommand(cmd1);  // release the workdatum command as it served its purpose giving us the list of CPL's
	
	var arrayCPL = list.split("^");  // split the list on the ^ character
	var arrayLength = arrayCPL.length;
	var tabIndex = 1;

	var hOp = InitOperation("MultiCPLDelete", "", 0);
	for (var x in arrayCPL) {
		// loop thru the array
		var cpl = arrayCPL[x];
		
	
		// skip the first one as it is not a CPL 
		if (x>0){
				AddUserModToOperation(hOp,"_Check_Var[" + x + "]",cpl,tabIndex,0, "");
				Delete("_Check_Var[" + x + "]"); // mark PCI variable for deletion by garbage collector after execution completes
				if (x % maxChecksPerTab == 0){
					tabIndex++
				}
		}
	}
	var nOpRet = DoOperationMods(hOp);
	FreeOperation(hOp);

	for (i=1; i<arrayLength; i++){
		var value = GetPCINumber("_Check_Var[" + i + "]");
		if (value == 1) {
			// delete CPL
			var result = DeleteCPL(arrayCPL[i]);
			if (result == -3){
				Display("workdatum '" + cpl + "' is deleted.\n");
			}
		}
	}


}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------

function DeleteCPL(strcpl)
{
	// Initialising command:- Workplane
	cmd1 = InitCommand(10, 61);
	ClearMods(cmd1);
	// Setting modifier 'Name'
	SetModifier(cmd1, 244, strcpl);
	return cmdret=ExecCommand(cmd1, -1);  // cmdret = -3 indicates a deleted CPL
}