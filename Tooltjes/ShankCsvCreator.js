/// <reference path="c:\program files (x86)\vero software\edgecam 2016 r1\cam\ShankCsvCreator\pci-vsdoc.js" />
/*	ShankCsvCreator.js

Programmer		:	A.S. Tilanus (alban.tilanus@ATS-global.com)
Company			:	ATS edgeIT
Version			:	2016R2 20170309
	
Description		:	Small PCI script for generating simple shanks for edgecam tools as csv files
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var CSVfolder;

// build the dialog
var hOp = InitOperation("Shank Creator", "", 0);

    //initialize "add milling tool"
    var CmdTstoreHole = InitCommand(36, 108); 
    ClearMods(CmdTstoreHole); 
    SetModifier(CmdTstoreHole, 140, "hole|1");

    var CmdTstoreMill = InitCommand(36, 108); 
    ClearMods(CmdTstoreMill); 
    SetModifier(CmdTstoreMill, 140, "mill|0");

    // add the toolstore browse button to the operation
    var nRet=AddCmdModToOperation(hOp, CmdTstoreHole, 180 , "^TSTORE" , 0 , "");

    //Sets up ToolStore to be ready to return values into modifiers contained in the PCI-JS
    SetCallBack("tsHoleTool" ,hOp  , CmdTstoreHole, 180);

    // add the toolstore browse button to the operation
    var nRet=AddCmdModToOperation(hOp, CmdTstoreMill, 180 , "^TSTORE" , 0 , "");

    //Sets up ToolStore to be ready to return values into modifiers contained in the PCI-JS
    SetCallBack("tsMillTool" ,hOp  , CmdTstoreMill, 180);
    SetCallBack("tsHoleTool" ,hOp  , CmdTstoreHole, 180);

    AddUserModToOperation(hOp, "_check_ShankCreator", "drill", "^", 0, "");

    AddUserModToOperation(hOp, "$ShankCreator[1]", "clearance diameter", "^clearance", 0, "");
    AddUserModToOperation(hOp, "$ShankCreator[4]", "clearance length", "^clearance", 0, "");
    AddUserModToOperation(hOp, "$ShankCreator[5]", "length to top of chamfer", "^clearance", 0, "");

    AddValidStateCmdMod(hOp, "_check_ShankCreator", 1, CmdTstoreMill, 180, 0);
    AddValidStateCmdMod(hOp, "_check_ShankCreator", 1, CmdTstoreHole, 180, 1);
    AddValidStateCmdMod(hOp, "_check_ShankCreator", 0, CmdTstoreMill, 180, 1);
    AddValidStateCmdMod(hOp, "_check_ShankCreator", 0, CmdTstoreHole, 180, 0);

var nOpRet = DoOperationMods(hOp);
FreeOperation(hOp);

// only proceed when the user pressed OK
if (nOpRet == _FINISH) {

    // retrieve the values from the dialog and convert them into usable values
    var D2 = 0.5 * GetPCINumber("$ShankCreator[1]");        // clearance diameter

    var L1 = GetPCINumber("$ShankCreator[4]");              // clearance length
    var L2 = GetPCINumber("$ShankCreator[5]");              // length to top of chamfer
   
    if (GetPCINumber("_check_ShankCreator") == 1) {
        // extract shankdiameter from selected tool
        GetModifier(CmdTstoreHole, 180, "$TEMP");
        ToolName = GetPCIVariable("$TEMP");

        // extract shankdiameter from selected tool
        GetModifier(CmdTstoreHole, 186, "TEMP");
        D3 = 0.5 * GetPCINumber("TEMP");

        // extract flute length from selected tool
        GetModifier(CmdTstoreHole, 179, "TEMP");
        L = GetPCINumber("TEMP");

        // extract total tool length from selected tool
        GetModifier(CmdTstoreHole, 185, "TEMP");
        L3 = L + GetPCINumber("TEMP");

        CSVfolder = GetRegistryString(_TSTORE_SUP_DIR_CFG_REC) + "ToolingGraphics\\Hole";
    }
    else {
        // extract shankdiameter from selected tool
        GetModifier(CmdTstoreMill, 180, "$TEMP");
        ToolName = GetPCIVariable("$TEMP");

        // extract shankdiameter from selected tool
        GetModifier(CmdTstoreMill, 186, "TEMP");
        D3 = 0.5 * GetPCINumber("TEMP");

        // extract flute length from selected tool
        GetModifier(CmdTstoreMill, 179, "TEMP");
        L = GetPCINumber("TEMP");

        // extract total tool length from selected tool
        GetModifier(CmdTstoreMill, 185, "TEMP");
        L3 = L + GetPCINumber("TEMP");

        CSVfolder = GetRegistryString(_TSTORE_SUP_DIR_CFG_REC) + "ToolingGraphics\\Mill";
    }
	

    myFile = CSVfolder + "\\" + ToolName + "_shank.csv";

    // Initialize a new FileSystemObject
    fso = new ActiveXObject("Scripting.FileSystemObject");

    // Check to see if the csv file already exists and ask for overwrite permission
    var nRet = _MB_RET_YES;
    if (fso.FileExists(myFile)) {
        nRet = MessageBox(_MB_YESNO, "Do you want to overwrite '" + ToolName + "_shank.csv'?");
    }

    // If the file doesn't exist yet, or has overwrite permission continue to write the file
    if (nRet == _MB_RET_YES ) {
        f = fso.CreateTextFile(myFile, true);

        f.writeline("USE_SHANK,0");
        f.writeline("PROFILE_ROTATE,SHANK,1,1");
        f.writeline("POINT," + D2 + ",0.000000,0.000000");
        f.writeline("POINT," + D2 + ",0.000000," + (L1 - L));
        f.writeline("POINT," + D3 + ",0.000000," + (L2 - L));
        f.writeline("POINT," + D3 + ",0.000000," + (L3 - L));
        f.writeline("OFFSET,0.000000,0.000000," + (L2 + 5));
        f.Close();
    }
	
	Display("created:\t" + ToolName + "_shank.csv\n");
}
FreeCommand(CmdTstoreHole);  // release initialized command
FreeCommand(CmdTstoreMill);  // release initialized command
