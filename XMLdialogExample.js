/// <reference path="c:\program files (x86)\planit\edgecam 2013 r1\cam\PCI\pci-vsdoc.js" />
/*	<name of the script>

Programmer		:	A.S. Tilanus (alban@wia.nl)
Company			:	Widenhorn Industriële Automatisering
Version			:	20130614
	
Description		:	Example usage of an XML dialog
	
Prerequisites	:	<any special things that are needed to run this macro>

Keywords		:	<any keywords. Seperated by a semicolumn ;>

Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
// Get the root directory of this PCI
var App_path = GetPCIVariable("$!textPciName").substring(0, GetPCIVariable("$!textPciName").lastIndexOf("\\")+1);

// Preset values on the dialog
SetPCIVariable("$myString", "Hello World");

// Activate the XML dialog
hDialog = CreateDialog(App_path + "XMLdialogExample.xml");

// Set the value of the first field
SetModifier(hDialog, 1, GetPCIVariable("$myString"));

// Set options for "Enable/disable" radio buttons
SetOptions(hDialog, 2, "Option A^Option B");
SetModifier(hDialog, 4, "blablabla");
    
var nResult = ShowDialog(hDialog);

// Retrieve the value of the first field
GetModifier(hDialog, 1, "$myString");
    

if (nResult == 1) // If clicked OK
{
	// Show the value of the first field to the user
    Alert(GetPCIVariable("$myString"));
}
FreeDialog(hDialog);