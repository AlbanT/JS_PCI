/// <reference path="c:\program files (x86)\planit\edgecam 2014 r2\cam\PCI\pci-vsdoc.js" />
/*	VectorText.js

Programmer		:	A.S. Tilanus (alban@wia.nl)
Company			:	Widenhorn Industriële Automatisering
Version			:	20140910
	
Description		:	Place text in a vector font with an acceptable character spacing
	
Prerequisites	:	<any special things that are needed to run this macro>

Keywords		:	vectortext

Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// for each character possible the width is saved in this array. The width of the letter Y for example is found in CharWidth_array[89] because the ASCII value for Y = 89.
var CharWidth_array = [
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"0",
	"3",
	"1.25",
	"2.9",
	"4.86",
	"4.56",
	"5.63",
	"6",
	"1.4",
	"2.6",
	"2.6",
	"3.48",
	"5.68",
	"1.25",
	"5.7",
	"2.25",
	"5.7",
	"4.6",
	"2",
	"6.88",
	"4.3",
	"5.88",
	"4.6",
	"4.3",
	"4.6",
	"4.6",
	"4.4",
	"2.36",
	"2.36",
	"5.2",
	"5.7",
	"5.2",
	"4.4",
	"6.58",
	"5.14",
	"4.6",
	"4.85",
	"4.6",
	"4.3",
	"4.7",
	"4.8",
	"4.6",
	"0.7",
	"3.5",
	"4.55",
	"4",
	"5.14",
	"4.6",
	"5.15",
	"5.15",
	"4.6",
	"5.1",
	"4.6",
	"4.6",
	"4.6",
	"4.5",
	"5.15",
	"6.25",
	"4.62",
	"5.15",
	"2.64",
	"7",
	"2.64",
	"4.6",
	"6.25",
	"1.25",
	"4",
	"4",
	"4",
	"4",
	"4",
	"2.9",
	"4",
	"3.7",
	"1.3",
	"2.34",
	"3.75",
	"0.7",
	"6.8",
	"3.75",
	"4.3",
	"4",
	"4",
	"2.9",
	"3.8",
	"2.9",
	"3.75",
	"4",
	"5.15",
	"3.75",
	"4.32",
	"3.77",
	"2.15",
	"0.7",
	"2.15",
	"5.7",
	"0"
];

// make modifications to the char width here:
CharWidth_array[50] = 4.58; //correction for the width of the character "2" a.k.a. ASCII 50
CharWidth_array[52] = 4.83; //correction for the width of the character "4" a.k.a. ASCII 52

var Location = {
	X: 0,
	Y: 0,
	Z: 0
};

if (ShowDialog() == _FINISH) {

	// Read the PCI variables set by the dialog and save them as JS variables
	var myString = GetPCIVariable("$_MTEXT_Var");
	var height = GetPCINumber("CharHeight");
	var width = GetPCINumber("CharWidth");
	var spaceWidth = GetPCINumber("CharSpace");

	// split the string into an array of chars
	// http://stackoverflow.com/questions/4547609/how-do-you-get-a-string-to-a-character-array-in-javascript
	var Char_array = myString.split("");

	AskForXYZlocation();


	// loop thru the array and convert the char to an ASCII value:
	for (var i = 0; i < Char_array.length; i++) {
		printChar(Char_array[i], Location, width, height);
		Location.X = Location.X + ((WidthOfChar(Char_array[i]) + spaceWidth) * (width / 10) * 1.1);
	}


}




//************************ END OF SCRIPT ****************************************************************

//#region FUNCTIONS


function ShowDialog() {
	/// <summary>
	/// Shows the Edgecam Dialog to the user
	/// </summary>
	/// <returns type="">EC Return value (_FINISH if OK was clicked)</returns>
	var hOp = InitOperation("Insert Vector Text for Engraving", "", 0);
	AddUserModToOperation(hOp, "$_MTEXT_Var", "Text:", "", 0, "");
	AddUserModToOperation(hOp, "CharWidth", "Character width (mm):", "", 0, "");
	AddUserModToOperation(hOp, "CharHeight", "Character height (mm):", "", 0, "");
	AddUserModToOperation(hOp, "CharSpace", "Additional Character Spacing (mm):", "", 0, "");
	var nOpRet = DoOperationMods(hOp);
	FreeOperation(hOp);

	return nOpRet
}


function WidthOfChar(CHAR) {
	/// <summary>
	/// Get the width of a specific CHAR from the CharWidth_array
	/// </summary>
	/// <param name="CHAR">The Character</param>
	/// <returns type="">The Width in mm</returns>
	return Number(CharWidth_array[CHAR.charCodeAt(0)]);
}


function printChar(character, TextLocation, Width, Height) {
	/// <summary>
	/// Insert a single CHAR as vector text in Edgecam
	/// </summary>
	/// <param name="character">The Character</param>
	/// <param name="TextLocation">The X location</param>
	/// <param name="Width">Char width</param>
	/// <param name="Height">Char Height</param>
	cmd1 = InitCommand(50, 11);
	ClearMods(cmd1);
	SetModifier(cmd1, 184, "Vector|1");
	SetModifier(cmd1, 174, "0.0");
	SetModifier(cmd1, 176, "Geen|0");
	SetModifier(cmd1, 178, "Links|0");
	SetModifier(cmd1, 171, Height);
	SetModifier(cmd1, 1, "2");
	SetModifier(cmd1, 3, "text");
	SetModifier(cmd1, 2, "Massief|0");
	SetModifier(cmd1, 170, character);
	SetModifier(cmd1, 175, "simplex|8");
	SetModifier(cmd1, 172, Width);
	SetModifier(cmd1, 179, "100");
	SetModifier(cmd1, 173, "90");
	SetModifier(cmd1, 207, "");
	SetModifier(cmd1, 195, "Standaard|0");
	gdh1 = InitDigInfo();
	AddFreeDig(gdh1, "x" + TextLocation.X + "y" + TextLocation.Y + "z" + TextLocation.Z)
	AddFinishDig(gdh1, _FINISH);
	cmdret = ExecCommand(cmd1, gdh1);
	FreeDigInfo(gdh1);
}


function AskForXYZlocation() {
	/// <summary>
	/// Ask the user te select a location
	/// </summary>
	var strPrompt = "Selecteer een locatie";
	nRet = AskDig(strPrompt, "strVar");

	if (nRet > 0) { //OK is pressed
		Location.X = GetPCINumber("X@strVar");
		Location.Y = GetPCINumber("Y@strVar");
		Location.Z = GetPCINumber("Z@strVar");
	}
}


//#endregion


