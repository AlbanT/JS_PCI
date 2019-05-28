/// <reference path="c:\program files (x86)\planit\edgecam 2013 r1\cam\PCI\pci-vsdoc.js" />
/*	Regenerate Timer.js

Programmer		:	A.S. Tilanus (alban@wia.nl)
Company			:	Widenhorn Industriële Automatisering
Version			:	26/02/2013
	
Description		:	Regenerate the complete sequence and display the amount of time it took to complete regeneration
	
Prerequisites	:	Edgecam

Keywords		:	Regenerate; Sequence; Time;

Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

ClearCache();
var StartTime = now();
RegenerateSequence();
var EndTime = now();

var RegenTime = DateDiff(StartTime, EndTime);
Display("regeneration took " + RegenTime + "\\");
alert("regeneration took " + RegenTime);


function RegenerateSequence() {
	/// <summary>
	/// Regenerate the current sequence in Edgecam
	/// </summary>
    Display("Regenerating....\\");
    cmd0 = InitCommand(11, 83);
    ClearMods(cmd0);
    SetModifier(cmd0, 198, "<yes>");
    cmdret = ExecCommand(cmd0, -1);
    Display("Regenerating finished\\");
}


function now() {
	/// <summary>
	/// Displays the current date and time in the feedback window and returns the current date time as Date()
	/// </summary>
	/// <returns type="">Returns the Date()</returns>
    var currentTime = new Date()

    var month = currentTime.getMonth() + 1 // getMonth returns 0-11
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()

    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    var millis = currentTime.getMilliseconds()

    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }

    if (millis < 10) {
        millis = millis + "00";
    }
    else if (millis < 100) {
        millis = millis + "0";
    }

    Display(day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds + "." + millis + "\\");

    return currentTime;
}

function DateDiff(date1, date2) {
	/// <summary>
	/// Calulate the time between 2 date1 and date2
	/// </summary>
	/// <param name="date1">startDate as Date()</param>
	/// <param name="date2">endDate as Date()</param>
	/// <returns type="">amount of time between date1 and date2</returns>
    var result = date2 - date1;

    return msToTime(result);
   }


   function msToTime(duration) {
   	/// <summary>
   	/// https://coderwall.com/p/wkdefg
   	/// </summary>
   	/// <param name="duration">value in ms</param>
   	/// <returns type="">string hh:mm:ss.ms</returns>
   	var milliseconds = parseInt((duration % 1000) / 100)
        , seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

   	hours = (hours < 10) ? "0" + hours : hours;
   	minutes = (minutes < 10) ? "0" + minutes : minutes;
   	seconds = (seconds < 10) ? "0" + seconds : seconds;

   	return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
   }

function ClearCache() {
    Display("Clearing cache...\\");
    // Initialising commando:- Tijdelijke bestanden wissen
    cmd1 = InitCommand(22, 151);
    ClearMods(cmd1);
    gdh1 = InitDigInfo();
    cmdret = ExecCommand(cmd1, gdh1);
    FreeDigInfo(gdh1);
    Display("Cache cleared\\");
   }


function AddSafeStartPosition(X,Y,Z) {
	// Initialising commando:- Veilige startpositie voor berekenen op de achtergrond
	cmd0 = InitCommand(101, 676);
	ClearMods(cmd0);
	// Instellen van 'X Coördinaat'
	SetModifier(cmd0, 101, X + "");
	// Instellen van 'Y Coördinaat'
	SetModifier(cmd0, 102, Y + "");
	// Instellen van 'Z Coördinaat'
	SetModifier(cmd0, 103, Z + "");
	nRet = ExecCommand(cmd0, -1);
}