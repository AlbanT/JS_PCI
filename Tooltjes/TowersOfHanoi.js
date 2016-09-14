/// <reference path="c:\program files\vero software\edgecam 2016 r2\cam\PCI\pci-vsdoc.js" />
/*	Towers of Hanoi

Programmer		:	Alban Tilanus
Company			:	ATS EdgeIT
Version			:	1/9/2016
	
Description		:	The purpose of this PCI is to present a JavaScript-based solution to the famous Tower of Hanoi problem. The problem calls for moving a set of disks from one tower to another with the restriction that at no time a disk is placed on top of a smaller disk. The problem has an associated well-known recursive algorithm.
                    http://screencast.com/t/GbCx92ws3y
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

if (IsFileEmpty()) {

    Askbox(["Number of disks"],["_int_NrOfDisks"]);
    var NrOfDisks = GetPCINumber("_int_NrOfDisks");

    // Predict the number of steps needed
    var TotalNrOfSteps = Math.pow(2, NrOfDisks) - 1;

    alert(NrOfDisks + " disks results in " + TotalNrOfSteps + " steps");

    if (TotalNrOfSteps < 1000)  // only simulate if number of steps is less then 1000
    {

        // array to store the amount of disks per pin
        var Nr = [NrOfDisks, 0, 0];

        // array to store the X-coordinates of the pins
        var XcoordsPin = [0, 200, 400];

        // Set the Maximum and Minimum disk diameter
        var MaxDia = 100;
        var MinDia = 20;

        // Calculate the difference in diameter per disk
        var DeltaDia = (MaxDia - MinDia) / Nr[0];

        // Set the height of the stack of disks
        var MaxHeight = 100;

        // Calculate the height per disk
        var Height = MaxHeight / Nr[0];

        // Variable to store the index of the current step
        var Step = 0;

        // Array to store the Entity numbers of the disks
        var EntNo = new Array();

        // Draw the disks at pin 1 and store their entity numbers in the EntNo array
        for (i = 0; i < Nr[0]; i++) {
            EntNo[Nr[0] - i] = DrawDisk(MaxDia - (i * DeltaDia), Height, (i % 32) + 1, i, MinDia / 2);
        }

        // draw the individual pins
        DrawPin(MinDia / 2, 1.1 * MaxHeight, XcoordsPin[0]);
        DrawPin(MinDia / 2, 1.1 * MaxHeight, XcoordsPin[1]);
        DrawPin(MinDia / 2, 1.1 * MaxHeight, XcoordsPin[2]);

        // Zoom extends
        ZoomExtends(MaxDia, MaxHeight);

        // Perform the Towers of Hanoy algoritm
        Hanoi(Nr[0], 0, 2, 1);
    }
}
else {
    alert("This file is not empty!\nStart a new file and rerun this PCI.");
}
// **************** BELOW HERE ARE ONLY FUNCTIONS *************************************************

function Hanoi(n, from, to, via) {
    /// <summary>
    /// recursive algorithm for the tower of Hanoi problem
    /// source: http://www.codeproject.com/Articles/679651/Tower-of-Hanoi-in-JavaScript
    /// </summary>
    /// <param name="n" type="int">Total number of disks</param>
    /// <param name="from" type="int">From pin (usually 0)</param>
    /// <param name="to" type="int">To pin (usually 2)</param>
    /// <param name="via" type="int">Via pin (usually 1)</param>

    if (n == 0) return;

    Hanoi(n-1, from, via , to);

    moveDisk(from,to, n);
  
    Hanoi(n-1, via, to , from);
}

function moveDisk(from, to, n) {
    /// <summary>
    /// move the disk from a pin to another pin
    /// </summary>
    /// <param name="from" type="int">From pin</param>
    /// <param name="to" type="int">To pin</param>
    /// <param name="n" type="int">Disk</param>

    // increment the step
    Step++;

    // decrement the amount of disks on the from pin by one
    Nr[from]--;

    // increment the amount of disks on the to pin by one
    Nr[to]++;
    
    // print the steps
    Display(Step + ": disk " + n + " From pin " + from + " To pin " + to + "\n");

    //alert("Continue");

    // Calculate the from and to coordinates for the translation
    var FromCoord = "X" + XcoordsPin[from] + "Y0" + "Z" + (Nr[from] * Height);
    var ToCoord = "X" + XcoordsPin[to] + "Y0" + "Z" + ((Nr[to]-1) * Height);
    
    // Translate the disk to the target pin
    TranslateDisk(EntNo[n], FromCoord, ToCoord);

    Wait(1);
}

function DrawDisk(Dia, Thickness, Colour, i, intDia) {
    /// <summary>
    /// Function to draw the disks
    /// </summary>
    /// <param name="Dia" type="double">Diameter of the disk</param>
    /// <param name="Thickness" type="double">Thickness of the disk</param>
    /// <param name="Colour" type="int">Colour of the disk (1 to 32)</param>
    /// <param name="i" type="int">Disk id</param>
    /// <param name="intDia" type="double">Diameter of the hole in the disk</param>
    /// <returns type="">Entity number of the disk</returns>

    // save the value of nextent
    var nextent = GetPCINumber("&NEXTENT");

    // Draw the disk
    cmd1 = InitCommand(50, 200);
    gdh1 = InitDigInfo();
    ClearMods(cmd1);

    // Setting modifier 'Externe diameter'
    SetModifier(cmd1, 6, Dia);
    // Setting modifier 'Interne diameter'
    SetModifier(cmd1, 7, intDia);
    // Set modifier 'Kleur'
    SetModifier(cmd1, 1, Colour);

    // Coordinate of the bottom centre of the disk
    AddFreeDig(gdh1, "X0Y0Z" + (i * Thickness));

    // Incremental coordinate of the top of the disk
    AddFreeDig(gdh1, "IZ" + Thickness);

    // Set the rest of the modifiers
    SetModifier(cmd1, 10, "0");
    SetModifier(cmd1, 51, "1");
    SetModifier(cmd1, 52, "Buis|4");
    SetModifier(cmd1, 3, "Geometrie");
    SetModifier(cmd1, 2, "0|0");
    
    // execute the command to draw the disk
    cmdret = ExecCommand(cmd1, gdh1);

    // release the buffer that contains the picks
    FreeDigInfo(gdh1);

    // return the entity number of the first element of entity type 15 searching upward from nextent
    return FindEntityNo(nextent, 15, 1, 0);
}

function TranslateDisk(entno, from, to) {
    /// <summary>
    /// Translate the disk
    /// </summary>
    /// <param name="entno" type="int">entity number of the disk to move</param>
    /// <param name="from" type="int">from pin</param>
    /// <param name="to" type="int">to pin</param>

    // Initialising command:- Transleren
    cmd1 = InitCommand(29, 66);
    ClearMods(cmd1);
    SetModifier(cmd1, 131, "<None>");
    SetModifier(cmd1, 132, "<None>");
    SetModifier(cmd1, 133, "<None>");
    // Setting modifier 'Dynamisch'
    SetModifier(cmd1, 243, "<Yes>");
    SetModifier(cmd1, 3, "<None>");
    gdh1 = InitDigInfo();
    // Add Entity Selection by number, 3DSnap JA Direction Vooruit (Topology ID)
    AddEntnoDig(gdh1, entno, _DIR_FORWARD, _DIG_3DSNAP);
    // Finish input
    AddFinishDig(gdh1, _FINISH);
    // Add Free dig to Selection input data
    AddFreeDig(gdh1, from);
    // Add Free dig to Selection input data
    AddFreeDig(gdh1, to);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
}

function ZoomExtends(Diameter, Height) {
    /// <summary>
    /// function to zoom extends and change view to isometric
    /// </summary>
    /// <param name="Diameter" type="double">diameter of the largest disk</param>
    /// <param name="Height" type="double">height of the total stack of disks</param>


    cmdView = InitCommand(1, 668); // init view
    cmdZoom = InitCommand(4, 6); // init zoom

    ClearMods(cmdZoom); // clear all modifiers for Zoom
    SetModifier(cmdView, 217, "Isometrisch|6"); // Iso view 

    SetModifier(cmdZoom, 8, "<Yes>"); // Zoom maximize

    ExecCommand(cmdZoom, -1); // exec zoom
    ExecCommand(cmdView, -1); // exec view

    // display the stocks as solid models instead of wireframe
    cmd1 = InitCommand(1, 668);
    // Setting modifier 'Doorzichtig ruwdeel'
    SetModifier(cmd1, 209, "<Yes>");
    cmdret = ExecCommand(cmd1, -1);
}

function DrawPin(diameter, height, Xpos) {
    /// <summary>
    /// function to draw a pin
    /// </summary>
    /// <param name="diameter" type="double">the diameter of the pin</param>
    /// <param name="height" type="double">the height of the pin</param>
    /// <param name="Xpos" type="double">x position of the pin</param>

    // Initialising command:- Ruwdeel/Spanmiddelen
    cmd1 = InitCommand(50, 200);
    ClearMods(cmd1);
    // Setting modifier 'Database-ID'
    SetModifier(cmd1, 10, "0");
    // Setting modifier 'Type'
    SetModifier(cmd1, 51, "Spanmiddelen|2");
    // Setting modifier 'Vorm'
    SetModifier(cmd1, 52, "Cilinder|2");
    // Setting modifier 'Radius'
    SetModifier(cmd1, 4, diameter / 2);
    // Setting modifier 'Kleur'
    SetModifier(cmd1, 1, "31");
    // Setting modifier 'Laag'
    SetModifier(cmd1, 3, "Pins");
    // Setting modifier 'Stijl'
    SetModifier(cmd1, 2, "0|0");
    gdh1 = InitDigInfo();
    // Add Free dig to Selection input data
    AddFreeDig(gdh1, "X" + Xpos + "Y0Z0");
    // Add Free dig to Selection input data
    AddFreeDig(gdh1, "IZ" + height);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
}

function IsFileEmpty() {
    /// <summary>
    /// function to determine is this file is new or not
    /// </summary>
    /// <returns type="boolean">true when is is a new file and false if it isn't</returns>

    if (GetPCINumber("&BASEENT") == GetPCINumber("&NEXTENT") - 1) {
        return true;
    }

    return false;
}