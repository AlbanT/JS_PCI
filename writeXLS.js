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

// initialize Excel
var objExcel = new ActiveXObject("Excel.Application");

// Show or hide Excel for the user
objExcel.visible = true;

// Create a new Excel file
var objWorkbook = objExcel.Workbooks.Add;

// Add a new worksheet to the Excel file
var objWorksheet = objWorkbook.Worksheets(1);

for (var i = 90; i <= 166; i++) {
    Query(i, true);
    var Xpos = GetPCIvariable("&XEND");
    var Ypos = GetPCIvariable("&YEND");

    objExcel.Cells(i-89, 1).Value = Xpos;
    objExcel.Cells(i-89, 2).Value = Ypos;
}

