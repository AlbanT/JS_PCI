/// <reference path="c:\program files (x86)\vero software\edgecam 2016 r1\cam\CreateCPLsFromComponentDatum\pci-vsdoc.js" />
/*	CreateCPLsFromComponentDatum.js

Programmer		:	A.S. Tilanus (alban.tilanus@ATS-global.com)
Company			:	ATS edgeIT
Version			:	2017R1 20170111
	
Description		:	PCI to generate a Front, Left, Right, Back and/or Bottom version of the ComponentDatum
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// extract all individual unique solids syntax = "filename "|" + instance for FindEntityNo()
var Solids = NrOfIndividualSolids();

// initialize the operation dialog
var hOp = InitOperation("Create ortogonal CPL's", "", 0);
// get the number of unique solids
var NrOfSolids = Solids.length;

// build the listbox
var ListCPLname = "Solid^";
for (i = 0; i < NrOfSolids; i++) {
    ListCPLname = ListCPLname + Solids[i].substr(0, Solids[i].indexOf("|")) + "^";
}
AddUserModToOperation(hOp, "_List_CompCPL", ListCPLname, "", 0, "");


AddUserModToOperation(hOp, "_Check_Front", GetPCIVariable("&FRONT"), "^Divider2", 0, "");
AddUserModToOperation(hOp, "_Check_Right", GetPCIVariable("&RIGHT"), "^Divider2", 0, "");
AddUserModToOperation(hOp, "_Check_Left", GetPCIVariable("&LEFT"), "^Divider2", 0, "");
AddUserModToOperation(hOp, "_Check_Bottom", GetPCIVariable("&BOTTOM"), "^Divider2", 0, "");
AddUserModToOperation(hOp, "_Check_Back", GetPCIVariable("&BACK"), "^Divider2", 0, "");
var nOpRet = DoOperationMods(hOp);
FreeOperation(hOp);

// extract the instance from the Solids array to use in de FindEntityNo()
var SolidID = Solids[GetPCINumber("_List_CompCPL") - 1].substr(Solids[GetPCINumber("_List_CompCPL") - 1].indexOf("|"));

// contruct the name of the base ComponentDatum
var CPL = GetPCINumber("_List_CompCPL") - 1;
if (CPL == 0) {
    CPL = "ComponentDatum";
}
else {
    CPL = "ComponentDatum" + "." + CPL;
}

// remember the current CPL to be able to restore it afterwards
var CurrentCPL = GetPCIVariable("&CPL");

// create the CPL's
if (GetPCIVariable("_Check_Front") == true) {
    CreateCPL(CPL + "." + GetPCIVariable("&FRONT"), 0, 0, 90, CPL);
    SetPCIVariable("_Check_Front", false);
}

if (GetPCIVariable("_Check_Right") == true) {
    CreateCPL(CPL + "." + GetPCIVariable("&RIGHT"), 90, 90, 0, CPL);
    SetPCIVariable("_Check_Right", false);
}

if (GetPCIVariable("_Check_Left") == true) {
    CreateCPL(CPL + "." + GetPCIVariable("&LEFT"), 90, -90, 0, CPL);
    SetPCIVariable("_Check_Left", false);
}

if (GetPCIVariable("_Check_Bottom") == true) {
    CreateCPL(CPL + "." + GetPCIVariable("&BOTTOM"), 180, 0, 0, CPL);
    SetPCIVariable("_Check_Bottom", false);
}

if (GetPCIVariable("_Check_Back") == true) {
    CreateCPL(CPL + "." + GetPCIVariable("&BACK"), -90, 0, 0, CPL);
    SetPCIVariable("_Check_Back", false);
}

// restore the original CPL
ActivateCPL(CurrentCPL);

function NrOfIndividualSolids() {
    var NrOfSolids = GetPCIVariable("&NUMBEROFSOLIDS");
    var prevSolidName = "";
    var IndividualSolids = [];

    // loop thru the Edgecam DB
    for (i = 0; i < NrOfSolids; i++) {
        // find each solids
        Query(FindEntityNo(_FINDENTNO_FROM_BASEENT, 161, i + 1, 0), true);

        // determine if it is a newly found solid
        if (GetPCIVariable("&SOLIDPATH") != prevSolidName) {
            prevSolidName = GetPCIVariable("&SOLIDPATH");

            // extract the plain filename from the filepath
            var FSO = new ActiveXObject("Scripting.FileSystemObject");

            // add the solid to the array
            IndividualSolids.push(FSO.GetFileName(GetPCIVariable("&SOLIDPATH")) + "|" + (i + 1));
        }
    }

    return IndividualSolids;
}


function CreateCPL(name, Xang, Yang, Zang, BaseCPL, ID) {
    // Initialising command:- CPL aanmaken
    cmd1 = InitCommand(2, 61);
    ClearMods(cmd1);
    // Setting modifier 'Naam'
    SetModifier(cmd1, 242, name);
    // Setting modifier 'Werkvlak'
    SetModifier(cmd1, 100, "Frezen(XY)|0");
    // Setting modifier 'Tekenvrijheid'
    SetModifier(cmd1, 101, "3D|1");
    SetModifier(cmd1, 246, "<None>");
    // Setting modifier 'Associatief CPL'
    SetModifier(cmd1, 165, "<Yes>");
    // Setting modifier 'CPL type'
    SetModifier(cmd1, 166, "Default|0");
    // Setting modifier 'Referentie'
    SetModifier(cmd1, 238, "");
    // Setting modifier 'CPL'
    SetModifier(cmd1, 244, BaseCPL);
    SetModifier(cmd1, 117, "<None>");
    // Setting modifier 'Roteren'
    SetModifier(cmd1, 236, "");
    // Setting modifier 'X rotatie'
    SetModifier(cmd1, 21, Xang);
    // Setting modifier 'Y rotatie'
    SetModifier(cmd1, 22, Yang);
    // Setting modifier 'Z rotatie'
    SetModifier(cmd1, 23, Zang);
    gdh1 = InitDigInfo();
    // Add Entity Selection by number, 3DSnap JA Direction Vooruit (Topology ID)
    AddEntnoDig(gdh1, FindEntityNo(_FINDENTNO_FROM_BASEENT, 161, ID, 0), _DIR_FORWARD, _DIG_3DSNAP);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
}


function ActivateCPL(name) {
    // Initialising command:- CPL
    cmd1 = InitCommand(16, 61);
    ClearMods(cmd1);
    // Setting modifier 'Naam'
    SetModifier(cmd1, 244, name);
    cmdret = ExecCommand(cmd1, -1);
}