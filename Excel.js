/*	Excel.js

Programmer		:	A.S. Tilanus (alban@wia.nl)
Company			:	Widenhorn Industriële Automatisering
Version			:	2013-03-10
	
Description		:	Uses an ActiveXObject to create an Excel worksheet
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

// Open an Excel file from disk
//var excBook = objExcel.Workbooks.open("c:\\Map2.xlsx");

// Set a value to a specific cell: (row,column)
objExcel.Cells(1, 1).Value = "X";

// Set the fontstyle of a specific cell to Bold
objExcel.Cells(1, 1).Font.Bold = true;

// Set the background colour for a cell
objExcel.Cells(1, 1).Interior.ColorIndex = 3;

// Set the font colour for a cell
objExcel.Cells(1, 1).Font.ColorIndex = 2;

// Insert values in other cells
objExcel.Cells(2, 1).Value = "1.45";
objExcel.Cells(3, 1).Value = "3.54";
objExcel.Cells(4, 1).Value = "78.9";
objExcel.Cells(5, 1).Value = "12.1234565432345676543";

// define a range of cells
var objRange = objExcel.Range("A1", "A5");

// Set the fontsize for the range
objRange.Font.Size = 10;

// Redefine a range of cells
objRange = objExcel.Range("A2", "A5");

// Set the Background colour for the range
objRange.Interior.ColorIndex = 36;

// Redefine the range to all the cells in the currently active column
objRange = objExcel.ActiveCell.EntireColumn;

// Change the width of the column in the range to fit all the data
objRange.AutoFit();

// show all possible colors represented by ColorIndex
objExcel.Cells(1, 3).Value = "ColorIndex";
objExcel.Cells(1, 3).Font.Bold = true;
for (i = 1; i <= 56; i++) {
    objExcel.Cells(i + 1, 3).Interior.ColorIndex = i;
    objExcel.Cells(i + 1, 3).Value = i;
}

//objWorkbook.SaveAs("c:\\truetemp.xlsx");

