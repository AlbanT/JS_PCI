/// <reference path="f:\Program Files\Vero Software\Edgecam 2018 R2\cam\PCI\pci-vsdoc.js" />
/*
        _______ _____   ______    _            _____ _______ 
     /\|__   __/ ____| |  ____|  | |          |_   _|__   __|
    /  \  | | | (___   | |__   __| | __ _  ___  | |    | |   
   / /\ \ | |  \___ \  |  __| / _` |/ _` |/ _ \ | |    | |   
  / ____ \| |  ____) | | |___| (_| | (_| |  __/_| |_   | |   
 /_/    \_\_| |_____/  |______\__,_|\__, |\___|_____|  |_|   
                                     __/ |                   
                                    |___/                    
TODO Fill in these parameters:									
Programmer		:	Alban Tilanus (support@ats-edgeIT.com)
Company			:	ATS EdgeIT
Version			:	20200430
	
Description		:	This script generates NC code for all sequences in the currently opened PPF file. It saves it in a specified folder (var DefaultNcOutputFolder) and names them PpfFileName + "_" + SequenceName + ".nc".
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.									
*/
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------
// extract the name of the ppf file without the file path and file extension
var PpfFileName = GetPCIVariable("&PARTNAMENOPATH");
var PpfFolderName = GetFolderPath(GetPCIVariable("&PARTNAME"));
var JpgFilepath = 	PpfFolderName + "\\" + PpfFileName + ".jpg";

//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
main();
//---------------------------------------------------------------

function main() {
	IsometricView();				// set view to isometric
	MachineVisibility(false);		// hide machine components
	FixtureVisibility(true);		// show fixture components
	ToolpathVisibility(false);		// hide all toolpath
	ToolVisibility(false);			// hide the tool
	RenderStock(true);				// render the stock
	RenderSolid(true);				// render the solid
	ZoomFit();						// zoom to fit

	Screenshot(JpgFilepath);		// take the screenshot

	ToolpathVisibility(true);		// make toolpath visible again
	ToolVisibility(true);			// make tool visible again
}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------

function Screenshot(file, width, height){
	if (width == undefined) {
		width = 0;
	}
	if (height == undefined) {
		height = 0;
	}
	// Initialising command:- Save JPG
	cmd1 = InitCommand(50, 713);
	ClearMods(cmd1);
	// Setting modifier 'Filename'
	SetModifier(cmd1, 56, file);
	// Setting modifier 'Width'
	SetModifier(cmd1, 172, width);
	// Setting modifier 'Height'
	SetModifier(cmd1, 171, height);
	cmdret = ExecCommand(cmd1, -1);
}

function IsometricView(){
	var cmd1 = InitCommand(1, 668); 
	// Setting modifier 'Aanzicht'
	SetModifier(cmd1, 217, "Isometrisch|6"); 
	var cmdret = ExecCommand(cmd1, -1); 
}

function MachineVisibility(bBase, bEnclosure, bAxisMount, bHead, bTable){

	if (bEnclosure == undefined && bAxisMount == undefined && bHead == undefined && bTable == undefined){
		bEnclosure = bBase;
		bAxisMount = bBase;
		bHead = bBase;
		bTable = bBase;
	}

	// Initialising command:- Machine-weergave
	var cmd1 = InitCommand(50, 679); 

	if (bBase == true){
		SetModifier(cmd1, 100, "<Yes>"); 
	}
	else {
		SetModifier(cmd1, 100, ""); 
	}

	if (bEnclosure == true){
		SetModifier(cmd1, 101, "<Yes>"); 
	}
	else {
		SetModifier(cmd1, 101, ""); 
	}

	if (bAxisMount == true){
		SetModifier(cmd1, 102, "<Yes>"); 
	}
	else {
		SetModifier(cmd1, 102, ""); 
	}

	if (bHead == true){
		SetModifier(cmd1, 103, "<Yes>"); 
	}
	else {
		SetModifier(cmd1, 103, ""); 
	}

	if (bTable == true){
		SetModifier(cmd1, 105, "<Yes>"); 
	}
	else {
		SetModifier(cmd1, 105, ""); 
	}
	
	var cmdret = ExecCommand(cmd1, -1); 
}

function FixtureVisibility(bFixture){
	// Initialising command:- Machine-weergave
	var cmd1 = InitCommand(50, 679); 
	if (bFixture == true){
		// Setting modifier 'Spanmiddelen'
		SetModifier(cmd1, 104, "<Yes>"); 
	}
	else {
		SetModifier(cmd1, 104, "");
	}
	var cmdret = ExecCommand(cmd1, -1); 
}

function ZoomFit(){
	// Initialising command:- Zoom Werkscherm
	var cmd1 = InitCommand(4, 6); 
	ClearMods(cmd1); 
	// Setting modifier 'Maximaliseer'
	SetModifier(cmd1, 8, "<Yes>"); 
	var cmdret = ExecCommand(cmd1, -1); 
}

function ToolpathVisibility(bVisible){
	if (bVisible == true){
		bVisible = "<Yes>";
	}
	else {
		bVisible = "";
	}
	// Initialising command:- Configureer aanzicht
	var cmd1 = InitCommand(1, 668); 
	// Setting modifier 'Gereedschapsbaan'
	SetModifier(cmd1, 206, bVisible); 
	var cmdret = ExecCommand(cmd1, -1); 
}

function RenderStock(bRender){
	if (bRender == true){
		bRender = "<Yes>";
	}
	else {
		bRender = "";
	}
	var cmd1 = InitCommand(1, 668);
	// Setting modifier 'Doorzichtig ruwdeel'
	SetModifier(cmd1, 209, bRender); 
	var cmdret = ExecCommand(cmd1, -1); 
}

function RenderSolid(bRender){
	if (bRender == true){
		bRender = "1";
	}
	else {
		bRender = "0";
	}
	var cmd1 = InitCommand(1, 668);
	SetModifier(cmd1, 210, bRender); 
	var cmdret = ExecCommand(cmd1, -1); 
}

function ToolVisibility(bVisibility){
	if (bVisibility == true){
		bVisibility = "<Yes>";
		bTool = 1;
	}
	else {
		bVisibility = "";
		bTool = 3;
	}
	var cmd1 = InitCommand(1, 668);
	// Setting modifier 'Weergave houder'
	SetModifier(cmd1, 235, bVisibility); 
	// Setting modifier 'Weergave'
	SetModifier(cmd1, 236, bTool); 
	var cmdret = ExecCommand(cmd1, -1); 
}



