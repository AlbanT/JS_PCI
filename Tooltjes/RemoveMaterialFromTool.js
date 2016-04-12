/// <reference path="c:\program files (x86)\vero software\edgecam 2016 r1\cam\PCI\pci-vsdoc.js" />
/*	RemoveMaterialFromTool

Programmer		:	ATilanus
Company			:	
Version			:	4/12/2016 10:45:35 AM
	
Description		:	<DESCRIPTION>
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var nRet = AskBox(["Tool description", "Material description"], ["$RemoveMaterialFromTool[0]", "$RemoveMaterialFromTool[1]"]);

DeleteMaterial(GetPCIVariable("$RemoveMaterialFromTool[0]"), GetPCIVariable("$RemoveMaterialFromTool[1]"));


function DeleteMaterial(ToolDesc,MaterialDesc) {
    //ActiveX control
    var connection = new ActiveXObject("ADODB.Connection");
    var connectionstring = GetRegistryString(_TSTORE_SVR_CFG_REC);
    

    var query = "";
    query += "UPDATE [dbo].[TS_MOUNTING] ";
    query += "SET [MNT_LAST_MATERIAL] = '<Any>'";
    //Display(query + "\n");
    connection.Open(connectionstring);
    connection.execute(query);


    query = "";
    query += "DELETE FROM [dbo].[TS_TOOL_CUT_DATA] ";
    query += "WHERE TCD_MATERIAL_DESC = '" + MaterialDesc + "' AND TCD_TOOL_DESC = '" + ToolDesc + "'";
    //Display(query + "\n");
    connection.execute(query);
    connection.close;
}