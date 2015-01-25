// Create an instance of a class SmarTeam
var EdgecamProject1 = new SmarTeam("A", "B", "C", "D", "E", "F", "G");
var EdgecamProject2 = new SmarTeam("AA", "BB", "CC", "DD", "EE", "FF", "GG");

alert(EdgecamProject1.WorkingFolder + "\n" + EdgecamProject2.WorkingFolder);


function SmarTeam(WorkingFolder, ModelPath, ProgramNumber, PartNumber, RevisionNumber, RoutingNumber, Alternative, Machine, Material, PLMnumber) {
	/// <summary>
	/// SmarTeam class to store information sent out by SmarTeam to use in Edgecam.
	/// </summary>
	/// <param name="WorkingFolder">Folder path to the working folder</param>
	/// <param name="ModelPath">path to the Catia assembly/part to be used in Edgecam</param>
	/// <param name="ProgramNumber">Program number of the NC code</param>
	/// <param name="PartNumber">Identification number for the part</param>
	/// <param name="RevisionNumber">Revision of the part</param>
	/// <param name="RoutingNumber"></param>
	/// <param name="Alternative"></param>
	this.WorkingFolder = WorkingFolder;
	this.ModelPath = ModelPath;
	this.ProgramNumber = ProgramNumber;
	this.PartNumber = PartNumber;
	this.RevisionNumber = RevisionNumber;
	this.RoutingNumber = RoutingNumber;
	this.Alternative = Alternative;
	this.Machine = Machine;
	this.Material = Material;
	this.PLMnumber = PLMnumber;
};