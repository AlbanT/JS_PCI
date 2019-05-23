/// <reference path="C:\Program Files\Vero Software\Edgecam 2018 R2\cam\PCI\pci-vsdoc.js" />
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
Version			:	20190523
	
Description		:	This script generates NC code for all sequences in the currently opened PPF file. It saves it in a specified folder (var DefaultNcOutputFolder) and names them PpfFileName + "_" + SequenceName + ".nc".
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.									
*/
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------

var DefaultNcOutputFolder = "F:\\TIJDELIJK\\MultipleSequences"
var retVal = _FINISH;



//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
main();
//---------------------------------------------------------------

function main() {
	var i=0;
	while (retVal == _FINISH) {
		// code block to be executed
		retVal = ActivateSequence(i);

		if (retVal == _FINISH) {
			var PpfFileName = GetPCIVariable("&PARTNAMENOPATH");
			var SequenceName = GetPCIVariable("&SEQUENCENAME");
			var NcFileName = DefaultNcOutputFolder + "\\" + PpfFileName + "_" + SequenceName + ".nc";
			GenerateCNC(NcFileName)
		}
		i++;
	}
}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------
function ActivateSequence(index){
	// Initialising command:- Machining Sequence
	var cmd1 = InitCommand(16, 90); 
	ClearMods(cmd1); 
	// Setting modifier 'Sequence Name'
	SetModifier(cmd1, 101, index); 
	return ExecCommand(cmd1, -1); 
}

function GenerateCNC(filename) {
	// Initialising command:- Generate CNC Code
	var cmd1 = InitCommand(19, 666); 
	ClearMods(cmd1); 
	// Setting modifier 'CNC Name^Browse...'
	SetModifier(cmd1, 14, filename); 
	// Setting modifier 'Operation Names'
	SetModifier(cmd1, 251, "<Yes>"); 
	var cmdret = ExecCommand(cmd1, -1);
}

