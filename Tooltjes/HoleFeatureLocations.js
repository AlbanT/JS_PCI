/// <reference path="c:\program files\vero software\edgecam 2016 r2\cam\PCI\pci-vsdoc.js" />
/*	HoleFeatureLocations

Programmer		:	Alban Tilanus (alban.tilanus@ats-global.com)
Company			:	
Version			:	17-09-2016
	
Description		:	PCI to extract the locations of individual holes in a hole feature group
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// create an array to hold the entitynumbers for the holes and one to store the hole location is
var IndividualHole = new Array();
var HoleLocations = new Array();

// fill the array with the entity numbers of the individual holes
IndividualHole = GetEntNoPerHole(SelectHole2Features());


// loop thru the individual holes and extract their XYZ location
for (x in IndividualHole) {
    // skip x=0 as this is the entity number of the hole group
    if (x > 0) {
        Query(IndividualHole[x], true);

        // store the locations as locationstrings in the HoleLocations array
        HoleLocations[x] = "X" + Round(GetPCIvariable("&XSTART"), 4) + " Y" + Round(GetPCIvariable("&YSTART"), 4) + " Z" + Round(GetPCIvariable("&ZSTART"), 4);

        // Delete the individual holes as we do not need them anymore
        DeleteHoleFeature(IndividualHole[x]);

        // Print the found locations
        Display("HoleLocations[" + x + "] = " + HoleLocations[x] + "\n");
    }
}




for (x in HoleLocations) {
    var example = UseTheFoundLocations(HoleLocations[x]);
    Display("This newly drawn arc is entity " + example + "\n");
}

// *************************************** BELOW HERE ARE ONLY FUNCTIONS *********************************************************************

function DeleteHoleFeature(EntNo) {
    /// <summary>
    /// Deletes an entity based on the given entity number
    /// </summary>
    /// <param name="EntNo" type="type">the entity number of the entity that needs to be deleted</param>
    cmd1 = InitCommand(10, 69);
    ClearMods(cmd1);
    gdh1 = InitDigInfo();
    AddEntnoDig(gdh1, EntNo, _DIR_FORWARD, _DIG_3DSNAP);
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
}

function Round(Value, Decimals) {
    /// <summary>
    /// Used to round a value to a set amount of decimals
    /// </summary>
    /// <param name="Value" type="type">the value</param>
    /// <param name="Decimals" type="type">the number of decimals</param>
    /// <returns type=""></returns>
    return Math.round(Value * Math.pow(10, Decimals)) / Math.pow(10, Decimals);
}

function GetEntNoPerHole(EntNo) {
    /// <summary>
    /// Extract individual holes from a given hole group
    /// </summary>
    /// <param name="EntNo" type="type">the entitynumber of the hole group</param>
    /// <returns type="">array containing the entity numbers of the individual holes</returns>

    // Retrieve the amount of individual holes in the hole feature
    Query(EntNo, true);
    var NrOfHolesInGroup = GetAttribute("Feature.Hole2.HoleCount");


    var result = new Array();
    result[0] = EntNo;

    if (NrOfHolesInGroup > 1) {
        // if the holegroup contains multiple holes we need to explode it 
        var FirstIndividualHole = ExplodeHoleFeature(EntNo);

        // save the entitynumbers of the individual holes in the array
        for (i = 0; i < NrOfHolesInGroup; i++) {
            result[i + 1] = FirstIndividualHole + i;
        }
    }
    else {
        // save the entitynumber of the hole in the array
        result[1] = result[0];
    }
    return result;
}

function SelectHole2Features() {
    /// <summary>
    /// ask the user to select a hole feature and return its entitynumber
    /// </summary>
    /// <returns type="">the entity number of the selected hole feature</returns>

    var HoleSelection = InitDigInfo();
    var nRet = AskDigInfo("Pick a hole feature", HoleSelection, _ENTITYDIG, _ETYPE_HOLE_FEATURE, "", _FALSE);

    if (nRet == _FINISH) {
        // user pressed RMB without selecting anything
        MessageBox(_MB_ICONERROR, "Invalid input!");
        return 0;
    }
    else {
        // extract the entitynumber from the selected hole feature
        QueryDigInfo(HoleSelection, 0);
        FreeDigInfo(HoleSelection);
        return GetPCINumber("&ENTNO");
    }
}

function ExplodeHoleFeature(EntNo) {
    /// <summary>
    /// Converts a hole group to individual holes
    /// </summary>
    /// <param name="EntNo" type="type">the entity number of the hole group</param>
    /// <returns type="">the entity number of the first individual hole</returns>

    var result = GetPCINumber("&NEXTENT");

    // Initialising command:- Gaten-groep splitsen
    cmd1 = InitCommand(25, 83);
    ClearMods(cmd1);
    SetModifier(cmd1, 1, "<None>");
    SetModifier(cmd1, 3, "Geometrie");
    gdh1 = InitDigInfo();
    AddEntnoDig(gdh1, EntNo, _DIR_FORWARD, _DIG_3DSNAP + _DIG_TANGENT + _DIG_2DCHAIN);
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);

    return result;
}

function UseTheFoundLocations(location) {
    /// <summary>
    /// Dummy function to illustrate how to use the found hole locations
    /// </summary>
    /// <param name="location" type="type">location string in the format of "X10Y20Z30"</param>
    /// <returns type="">the entity number of the drawn circle</returns>

    var result = GetPCINumber("&NEXTENT");

    // Initialising command:- Boog
    cmd1 = InitCommand(2, 2);
    ClearMods(cmd1);
    SetModifier(cmd1, 6, "<None>");
    SetModifier(cmd1, 7, "<None>");
    SetModifier(cmd1, 104, "10");
    SetModifier(cmd1, 1, "1");
    SetModifier(cmd1, 3, "Geometrie");
    SetModifier(cmd1, 2, "Massief|0");
    gdh1 = InitDigInfo();
    AddFreeDig(gdh1, location);
    AddFinishDig(gdh1, _FINISH);
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);

    return result;
}