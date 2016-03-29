/*	writeXLS.js

Programmer		:	A.S. Tilanus (alban@wia.nl)
Company			:	Widenhorn Industriële Automatisering
Version			:	2013-03-10
	
Description		:	Use ActiveXObject to write to a Microsoft Excel worksheet
                    Additional info for office 2007: http://msdn.microsoft.com/en-us/library/office/bb149081%28v=office.12%29.aspx
	
Prerequisites	:	Excel

Keywords		:	Excel; ActiveXObject;

Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/// <reference path="c:\program files (x86)\planit\edgecam 2013 r1\cam\PCI\pci-vsdoc.js" />

// create 100 randomly placed points
var startEntitiy = Draw_100_random_points();

// initialize Excel
var objExcel = new ActiveXObject("Excel.Application");

// Show or hide Excel for the user
objExcel.visible = true;

// Create a new Excel file
var objWorkbook = objExcel.Workbooks.Add;

// Add a new worksheet to the Excel file
var objWorksheet = objWorkbook.Worksheets(1);

// startrow in Excel
var j = 1;

// Retrieve location for all points and place in Excelsheet
for (var i = startEntitiy; i < startEntitiy+100; i++) {
    Query(i, true);
    var Xpos = GetPCINumber("&XSTART");
    var Ypos = GetPCINumber("&YSTART");

    objExcel.Cells(j, 1).Value = Xpos;
    objExcel.Cells(j, 2).Value = Ypos;
	j++;
}

//objExcel.Application.Quit();

function Draw_100_random_points(){
	var startEntitiy = GetPCINumber("&NEXTENT");
	var min = -100;
	var max = 100;
	for (i=0;i<100;i++) {
		cmd1 = InitCommand(2, 36);
		ClearMods(cmd1);
		SetModifier(cmd1, 1, "Blauw|2");
		SetModifier(cmd1, 3, "Geometrie");
		SetModifier(cmd1, 2, "Massief|0");
		gdh1 = InitDigInfo();
		AddFreeDig(gdh1, "X"+Math.floor(Math.random()*(max-min+1)+min)+"Y"+Math.floor(Math.random()*(max-min+1)+min));
		AddFinishDig(gdh1 , _FINISH);
		cmdret = ExecCommand(cmd1, gdh1);
		FreeDigInfo(gdh1);
	}
	return startEntitiy;
}

