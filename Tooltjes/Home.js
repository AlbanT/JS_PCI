/// <reference path="c:\program files (x86)\vero software\edgecam 2016 r1\cam\PCI\pci-vsdoc.js" />
/*	Home.js

Programmer		:	ATilanus
Company			:	
Version			:	1/25/2016 11:39:56 AM
	
Description		:	Combines an isometric view with a zoom maximize
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

HideMachine();

cmdView = InitCommand(1, 668); // init view
cmdZoom = InitCommand(4, 6); // init zoom

ClearMods(cmdZoom); // clear all modifiers for Zoom

if (GetPCIVariable("&ENVIRONMENT") == 1) {
	// milling
	SetModifier(cmdView, 217, "Isometrisch|6"); // Iso view 
}
else {
	// turning
	SetModifier(cmdView, 217, "Draaien|0"); // Iso view  4
}
SetModifier(cmdZoom, 8, "<Yes>"); // Zoom maximize

ExecCommand(cmdZoom, -1); // exec zoom
ExecCommand(cmdView, -1); // exec view



function HideMachine() {
	// Initialising commando:- Machine-weergave
	cmd1 = InitCommand(50, 679);
	ClearMods(cmd1);
	// Instellen van 'Basis'
	SetModifier(cmd1, 100, "<No>");
	// Instellen van 'Kappen'
	SetModifier(cmd1, 101, "<No>");
	// Instellen van 'Asophanging'
	SetModifier(cmd1, 102, "<No>");
	// Instellen van 'Koppen'
	SetModifier(cmd1, 103, "<No>");
	// Instellen van 'Spanmiddelen'
	SetModifier(cmd1, 104, "<Yes>");
	// Instellen van 'Tafel'
	SetModifier(cmd1, 105, "<No>");
	cmdret = ExecCommand(cmd1, -1);
}