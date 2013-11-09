/*	wscript_network.js

	Programmer		:	A.S. Tilanus (alban@wia.nl)
	Company			:	Widenhorn Industriële Automatisering
	Version			:	2013-03-07
	
	Description		:	Use ActiveXObject("wscript.network") to extract the username, computername and domain of the PC
	
	Prerequisites	:	<any special things that are needed to run this macro>

	Keywords		:	ActiveXObject

	Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
wshell=new ActiveXObject("wscript.network");
var strDomain = wshell.UserDomain;
var strComputer = wshell.ComputerName;
var strUser = wshell.UserName;

alert("Domain: " + strDomain + "\n" + "Computer: " + strComputer + "\n" + "User: " + strUser);