// retrieve the rootfolder of this PCI
strDirectory = GetPCIVariable("$!textPciName").substring(0, GetPCIVariable("$!textPciName").lastIndexOf("\\"));

// initialize Excel
var objExcel = new ActiveXObject("Excel.Application");
 
// Show or hide Excel for the user
objExcel.visible = true;
 
// Create a new Excel file
var objWorkbook = objExcel.Workbooks.Add;
 
// Add a new worksheet to the Excel file
var objWorksheet = objWorkbook.Worksheets(1).activate;
 
var XlSheet = objWorkbook.activeSheet;
 
// found on: http://stackoverflow.com/questions/2371430/insert-image-into-excel-cells-using-activexobject-excel-application
 
MyPic = XlSheet.Pictures.Insert(strDirectory + "\\InsertImageInExcel.png");
MyPic.Top = XlSheet.Range("A1").Top;
MyPic.Left = XlSheet.Range("E1").Left;
MyPic.ShapeRange.Height = XlSheet.Range("A1").RowHeight * 10;
