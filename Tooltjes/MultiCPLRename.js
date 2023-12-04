/// <reference path="c:\Program Files\Hexagon\Edgecam 2023.1\cam\PCI\pci-vsdoc.js" />
/*
TODO Fill in these parameters:									
Programmer		:	Alban Tilanus (alban.tilanus@ats-global.com)
Company			:	ATS EdgeIT
Version			:	20200501
	
Description		:	PCI to mass rename CPL's
	
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
    var cmd1 = InitCommand(1, 61);
    var list = GetModifierList(cmd1, 240); //list = "-1^Workplane-1^Workplane-2^Workplane-3"
    FreeCommand(cmd1); // release the workdatum command as it served its purpose giving us the list of CPL's

    var arrayCPL = list.split("^"); // split the list on the ^ character
    var arrayLength = arrayCPL.length;
    var tabIndex = 1;

    var hOp = InitOperation("MultiCPLRename", "", 0);
    for (var x in arrayCPL) {
        // loop thru the array
        var cpl = arrayCPL[x];

        // skip the first one as it is not a CPL
        if (x > 0) {
            AddUserModToOperation(
                hOp,
                "$new_cpl_name[" + x + "]",
                cpl,
                tabIndex,
                0,
                ""
            );
            Delete("$new_cpl_name[" + x + "]");
            if (x % maxChecksPerTab == 0) {
                tabIndex++;
            }
        }
    }
    var nOpRet = DoOperationMods(hOp);
    FreeOperation(hOp);

    for (i = 1; i < arrayLength; i++) {
        var new_name = GetPCIVariable("$new_cpl_name[" + i + "]");
        Display("new_name = " + new_name + "\n");

        if (new_name != "") {
            rename_cpl(arrayCPL[i], new_name);
            Display(
                "workdatum '" +
                    arrayCPL[i] +
                    "' is renamed to '" +
                    new_name +
                    "'.\n"
            );
        }
    }
}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------

function rename_cpl(cpl_from_name, cpl_to_name) {
    var cmd1 = InitCommand(1, 61);
    // select the source cpl
    SetModifier(cmd1, 240, cpl_from_name);

    // retrieve the settings for the source cpl
    GetModifier(cmd1, 100, "workplane");
    GetModifier(cmd1, 101, "dimensions");
    GetModifier(cmd1, 165, "associative");
    GetModifier(cmd1, 166, "wp_type");
    FreeCommand(cmd1); // release the workdatum command as it served its purpose giving us the list of CPL's

    // nominate the used pci variables for deletion when the pci finishes
    Delete("workplane");
    Delete("dimensions");
    Delete("associative");
    Delete("wp_type");

    // rename the cpl
    var cmd1 = InitCommand(1, 61);
    ClearMods(cmd1);
    // Setting modifier 'Workplane'
    SetModifier(cmd1, 240, cpl_from_name);
    // Setting modifier 'Name'
    SetModifier(cmd1, 242, cpl_to_name);
    // Setting modifier 'Work Plane'
    SetModifier(cmd1, 100, GetPCIVariable("workplane"));
    // Setting modifier 'Dimensions'
    SetModifier(cmd1, 101, GetPCIVariable("dimensions"));
    if (GetPCIVariable("associative") == 1) {
        // Setting modifier 'Associative'
        SetModifier(cmd1, 165, "<Yes>");
    }
    // Setting modifier 'Workplane Type'
    SetModifier(cmd1, 166, GetPCIVariable("wp_type"));
    var cmdret = ExecCommand(cmd1, -1);
}
