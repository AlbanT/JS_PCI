/// <reference path="f:\Program Files\Vero Software\Edgecam 2020.0\cam\PCI\pci-vsdoc.js" />
/*									
Programmer		:	Alban Tilanus (alban.tilanus@ats-global.com)
Company			:	ATS EdgeIT
Version			:	20200515
	
Description		:	Script which allows the user to easily replace the starting portion of the paths to the tool/holder/fixture illustrations
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.	

License		:	"THE BEER-WARE LICENSE" (Revision 42): <PROGRAMMER EMAIL> wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
 */
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------


//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
main();
//---------------------------------------------------------------

function main() {
	AskBox(["te wijzigen categorie^houders^gereedschappen^spanmiddelen^", "te vervangen tekst:", "vervangen door:"],["_list_type","$source","$target"]);
	Delete("$target"); // flag PCI variable for deletion after script exits
	Delete("$source"); // flag PCI variable for deletion after script exits
	Delete("_list_type"); // flag PCI variable for deletion after script exits
}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------

if (GetPCINumber("_list_type") == 1){
	// houders
	ReplaceTextInHolderGraphics(GetPCIVariable("$source"), GetPCIVariable("$target"));
}
else if (GetPCINumber("_list_type") == 2){
	// gereedschappen
	ReplaceTextInToolGraphics(GetPCIVariable("$source"), GetPCIVariable("$target"));
}
else {
	// spanmiddelen
	ReplaceTextInFixtureGraphics(GetPCIVariable("$source"), GetPCIVariable("$target"));
}


function ReplaceTextInHolderGraphics(oldPath,newPath){
	//var oldPath = "\\\\ZBAPPL06\\Edgecam\\";
	//var newPath = "\\\\ZBAPPL07\\Applicaties\\Edgecam\\";

	//build the SQL query, note that this might need some tweaking between EC versions!!!!
	var Query = "UPDATE [dbo].[TS_MOUNTING] SET [MNT_TOOL_GRAPHIC_FILE] = REPLACE([MNT_TOOL_GRAPHIC_FILE],'" + oldPath + "','" + newPath + "') WHERE [MNT_TOOL_GRAPHIC_FILE] like  '" + oldPath + "%'";

	//ActiveX control
	var connection = new ActiveXObject("ADODB.Connection") ;
	var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
	connection.Open(connectionstring);
	var rs = new ActiveXObject("ADODB.Recordset");

	connection.execute(Query)

	//close the connections between the macro and the SQL server
	connection.close;
}

function ReplaceTextInToolGraphics(oldPath,newPath){
	//var oldPath = "\\\\ZBAPPL06\\Edgecam\\";
	//var newPath = "\\\\ZBAPPL07\\Applicaties\\Edgecam\\";

	//build the SQL query, note that this might need some tweaking between EC versions!!!!
	var Query = "UPDATE [dbo].[TS_TOOL] SET [TL_TOOL_GRAPHIC_FILE] = REPLACE([TL_TOOL_GRAPHIC_FILE],'" + oldPath + "','" + newPath + "') WHERE [TL_TOOL_GRAPHIC_FILE] like  '" + oldPath + "%'";

	//ActiveX control
	var connection = new ActiveXObject("ADODB.Connection") ;
	var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
	connection.Open(connectionstring);
	var rs = new ActiveXObject("ADODB.Recordset");

	connection.execute(Query)

	//close the connections between the macro and the SQL server
	connection.close;
}

function ReplaceTextInFixtureGraphics(oldPath,newPath){
	//build the SQL query, note that this might need some tweaking between EC versions!!!! 
	var Query1 = "UPDATE [dbo].[TS_FIXTURES_VICES] SET [VICE_MODEL_PATH] = REPLACE([VICE_MODEL_PATH],'" + oldPath + "','" + newPath + "') WHERE [VICE_MODEL_PATH] like  '" + oldPath + "%'"; 
	var Query2 = "UPDATE [dbo].[TS_FIXTURES_VICES_JAWS] SET [VICEJAW_MODEL_PATH] = REPLACE([VICEJAW_MODEL_PATH],'" + oldPath + "','" + newPath + "') WHERE [VICEJAW_MODEL_PATH] like  '" + oldPath + "%'"; 
	var Query3 = "UPDATE [dbo].[TS_FIXTURES_CHUCKS] SET [CHK_MODEL_PATH] = REPLACE([CHK_MODEL_PATH],'" + oldPath + "','" + newPath + "') WHERE [CHK_MODEL_PATH] like  '" + oldPath + "%'"; 
	var Query3a = "UPDATE [dbo].[TS_FIXTURES_CHUCKS] SET [CHK_JAW_MODEL_PATH] = REPLACE([CHK_JAW_MODEL_PATH],'" + oldPath + "','" + newPath + "') WHERE [CHK_JAW_MODEL_PATH] like  '" + oldPath + "%'"; 
	var Query4 = "UPDATE [dbo].[TS_FIXTURES_CUSTOM] SET [CUSTOM_MODEL_PATH] = REPLACE([CUSTOM_MODEL_PATH],'" + oldPath + "','" + newPath + "') WHERE [CUSTOM_MODEL_PATH] like  '" + oldPath + "%'"; 
	
	//ActiveX control 
	var connection = new ActiveXObject("ADODB.Connection") ; 
	var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC); 
	connection.Open(connectionstring); 
	var rs = new ActiveXObject("ADODB.Recordset"); 
	
	connection.execute(Query1);
	connection.execute(Query2); 
	connection.execute(Query3); 
	connection.execute(Query3a);
	connection.execute(Query4); 
	
	//close the connections between the macro and the SQL server 
	connection.close; 
}