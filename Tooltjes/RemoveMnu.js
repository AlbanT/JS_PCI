/// <reference path="c:\program files (x86)\planit\edgecam 2015 r1\cam\PCI\pci-vsdoc.js" />
/*     <name of the script>

Programmer           :      A.S. Tilanus (alban.tilanus@ATS-global.com)
Company                    :      ATS edgeIT
Version                    :      20150605
       
Description          :      Deletes the MNU file for the currently active postprocessor
       
Disclaimer           :      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var CurrentPost = GetPCIVariable("&POSTNAME" );
CurrentPost = CurrentPost.replace( ".mcp", "" );
CurrentPost = CurrentPost.replace( ".tcp", "" );

var ECversion = GetPCIVariable("&VERSION" );
ECversion = ECversion.substr(0, 7)

var Folder = "Planit" ;
if (Number(ECversion) > 2015.10) {
    Folder = "Vero Software"
}

var LocalAppData = NormalizeEnvironmentStrings("%LOCALAPPDATA%\\" + Folder + "\\" + ECversion + "\\edgecam\\Language" );

SetPackage(0);


var FSO = new ActiveXObject("Scripting.FileSystemObject");

if (FSO.FileExists(LocalAppData + "\\nederlands\\" + CurrentPost + ".mnu") == _TRUE) {
    FSO.DeleteFile(LocalAppData + "\\nederlands\\" + CurrentPost + ".mnu" , _TRUE);
    Display( "Verwijderd: %LOCALAPPDATA%/" + Folder + "/" + ECversion + "/edgecam/Language/nederlands" + "/" + CurrentPost + ".mnu\\");
}

if (FSO.FileExists(LocalAppData + "\\" + CurrentPost + ".mnu") == _TRUE) {
    FSO.DeleteFile(LocalAppData + "\\" + CurrentPost + ".mnu" , _TRUE);
    Display( "Verwijderd: %LOCALAPPDATA%/" + Folder + "/" + ECversion + "/edgecam/Language" + "/" + CurrentPost + ".mnu\\");
}


SetPackage(1);

// ************************ END of Script **************************************************************************

function NormalizeEnvironmentStrings(sPath) {
    /// <summary>
    /// Replace all environment variables used in a filepath by their values
    /// </summary>
    /// <param name="sPath">path including environment variables</param>
    /// <returns type="">useable path with all environment vars replaced by their values</returns>
    var oTest = new ActiveXObject("wscript.shell" );
    var Pos1 = sPath.indexOf( "%");
    var Pos2 = sPath.indexOf( "%", Pos1 + 1);
    sPath = sPath.replace(sPath.substr(Pos1, Pos2 + 1), oTest.ExpandEnvironmentStrings(sPath.substr(Pos1, Pos2 + 1)));
    oTest = null;

    return sPath
}
