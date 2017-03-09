/// <reference path="c:\program files (x86)\vero software\edgecam 2016 r1\cam\ShankCsvCreator\pci-vsdoc.js" />
/*	ShankCsvCreator.js

Programmer		:	A.S. Tilanus (alban.tilanus@ATS-global.com)
Company			:	ATS edgeIT
Version			:	2016R2 20170309
	
Description		:	Small PCI script for generating simple shanks for edgecam tools as csv files
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// build the dialog
var hOp = InitOperation("Shank Creator", "", 0);
AddUserModToOperation(hOp, "$ShankCreator[7]", "Name of csv", "^", 0, "");
AddUserModToOperation(hOp, "$ShankCreator[3]", "flute length", "^", 0, "");

AddUserModToOperation(hOp, "$ShankCreator[1]", "clearance diameter", "^clearance", 0, "");
AddUserModToOperation(hOp, "$ShankCreator[4]", "clearance length", "^clearance", 0, "");
AddUserModToOperation(hOp, "$ShankCreator[5]", "length to top of chamfer", "^clearance", 0, "");

AddUserModToOperation(hOp, "$ShankCreator[2]", "shank diameter", "^shank", 0, "");
AddUserModToOperation(hOp, "$ShankCreator[6]", "total tool length", "^shank", 0, "");

var nOpRet = DoOperationMods(hOp);
FreeOperation(hOp);

// only proceed when the user pressed OK
if (nOpRet == _FINISH) {

    // retrieve the values from the dialog and convert them into usable values
    var D2 = 0.5 * GetPCINumber("$ShankCreator[1]");        // clearance diameter
    var D3 = 0.5 * GetPCINumber("$ShankCreator[2]");        // shank diameter

    var L = GetPCINumber("$ShankCreator[3]");               // flute length
    var L1 = GetPCINumber("$ShankCreator[4]");              // clearance length
    var L2 = GetPCINumber("$ShankCreator[5]");              // length to top of chamfer
    var L3 = GetPCINumber("$ShankCreator[6]");              // total tool length
    var ToolName = GetPCIVariable("$ShankCreator[7]");      // total tool length

    var CSVfolder = GetRegistryString(_TSTORE_SUP_DIR_CFG_REC) + "ToolingGraphics\\Mill";

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
}

