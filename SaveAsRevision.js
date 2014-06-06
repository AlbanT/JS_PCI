/*	SaveAsRevision.js

	Programmer		:	A.S. Tilanus (alban@wia.nl)
	Company			:	Widenhorn Industriële Automatisering
	Version			:	20140606
	
	Description		:	Save the current file with a datetime suffix =>  c:\test.ppf -> c:\testREV20140606122545.ppf
	
	Prerequisites	:	<any special things that are needed to run this macro>

	Keywords		:	<any keywords. Seperated by a semicolumn ;>

	Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
// retrieve the current filename
var BaseFilename = GetPCIVariable("&PARTNAME")

// get rid of the double quotes
BaseFilename = BaseFilename.replace(/"/g, ""); 

// replace the backslashes with slashes for JS
BaseFilename = BaseFilename.replace(/\\/g, "/");

// remove any previous ISO datetime stamp
BaseFilename = BaseFilename.replace(/[R]+[E]+[V]+[0-9]+/g, "");

// get rid of the .ppf or .PPF extension
BaseFilename = BaseFilename.replace(/[.]+[P]+[P]+[F]/ig, "");

// add the revision ISO datetime stamp (YYYYMMDDhhmmss)
BaseFilename = BaseFilename + "REV" + now() + ".ppf";

SaveFile(BaseFilename);

function SaveFile(filename) {
 // Initialising commando:- Bestand
 cmd1 = InitCommand(19, 3);
 ClearMods(cmd1);
 // Instellen van 'Naam^Bladeren...'
 SetModifier(cmd1, 14, filename );
 gdh1 = InitDigInfo();
 cmdret = ExecCommand(cmd1, gdh1);
 FreeDigInfo(gdh1);
}

function now() {
var currentTime = new Date()

var month = currentTime.getMonth() + 1 //getMonth returns 0-11
var day = currentTime.getDate()
var year = currentTime.getFullYear()

var hours = currentTime.getHours()
var minutes = currentTime.getMinutes()
var seconds = currentTime.getSeconds()
if (minutes < 10){
minutes = "0" + minutes
}
if (seconds < 10){
seconds = "0" + seconds
}

if (month < 10) {
	month = "0" + month;
}

if (day < 10) {
	day = "0" + day;
}

if (hours < 10) {
	hours = "0" + hours;
}

return year + month + day + hours + minutes + seconds
//return day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
}