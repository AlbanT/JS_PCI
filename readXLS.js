/*	readXLS.js

Programmer		:	A.S. Tilanus (alban@wia.nl)
Company			:	Widenhorn Industriële Automatisering
Version			:	2013-03-10
	
Description		:	Use ActiveXObject to read from a Microsoft Excel worksheet
                    Additional info for office 2007: http://msdn.microsoft.com/en-us/library/office/bb149081%28v=office.12%29.aspx
	
Prerequisites	:	Excel

Keywords		:	Excel; ActiveXObject;

Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/// <reference path="c:\program files (x86)\planit\edgecam 2013 r1\cam\PCI\pci-vsdoc.js" />

// retrieve the rootfolder of this PCI
strDirectory = GetPCIVariable("$!textPciName").substring(0, GetPCIVariable("$!textPciName").lastIndexOf("\\"));

// initialize the commandhandle and digitize handle for a polyline
InitializePolyline();

// initialize Excel
var objExcel = new ActiveXObject("Excel.Application");

// Show or hide Excel for the user
objExcel.visible = true;

// Open an Excel file from disk
var excBook = objExcel.Workbooks.open(strDirectory + "\\connect_the_dots.xlsx");

var Xpos=0;
var Ypos=0;
var i=2;
while (Xpos != undefined) {
    Xpos = objExcel.Cells(i, 1).Value;
    Ypos = objExcel.Cells(i, 2).Value;

    if (Xpos != undefined) {
        // show the coordinates in the feedback window
        Display(i - 1 + " => " + Xpos + " , " + Ypos + "\\");

        // add the coordinates to the digitize handle for the polyline
        AddFreeDig(gdhPolyline, "X" + Xpos + "Y" + Ypos);
    }
    i++;
}

// draw the polyline
ExecutePolyline();

// END OF SCRIPT /////////////////////////////////////////////////////////////


function ExecutePolyline() {
    // Invoer beëindigen
    AddFinishDig(gdhPolyline, _FINISH);
    cmdret = ExecCommand(cmdPolyline, gdhPolyline);
    FreeDigInfo(gdhPolyline);
}


function InitializePolyline() {
    // Initialising commando:- Lijn
    cmdPolyline = InitCommand(2, 1);
    ClearMods(cmdPolyline);
    // Instellen van 'Polylijn'
    SetModifier(cmdPolyline, 155, "<Yes>");
    SetModifier(cmdPolyline, 107, "<None>");
    SetModifier(cmdPolyline, 111, "<None>");
    SetModifier(cmdPolyline, 152, "<None>");
    SetModifier(cmdPolyline, 153, "<None>");
    // Instellen van 'Kleur'
    SetModifier(cmdPolyline, 1, "Fel Rood|17");
    // Instellen van 'Laag'
    SetModifier(cmdPolyline, 3, "Geometrie");
    // Instellen van 'Stijl'
    SetModifier(cmdPolyline, 2, "Massief|0");
    gdhPolyline = InitDigInfo();
}
