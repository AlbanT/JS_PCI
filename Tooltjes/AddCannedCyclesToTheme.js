/// <reference path="f:\Program Files\Hexagon\Edgecam 2021.0\cam\PCI\pci-vsdoc.js" />
/*
        _______ _____   ______    _            _____ _______ 
     /\|__   __/ ____| |  ____|  | |          |_   _|__   __|
    /  \  | | | (___   | |__   __| | __ _  ___  | |    | |   
   / /\ \ | |  \___ \  |  __| / _` |/ _` |/ _ \ | |    | |   
  / ____ \| |  ____) | | |___| (_| | (_| |  __/_| |_   | |   
 /_/    \_\_| |_____/  |______\__,_|\__, |\___|_____|  |_|   
                                     __/ |                   
                                    |___/                    
								
Programmer		:	Alban Tilanus (alban.tilanus@ats-global.com)
Company			:	ATS EdgeIT
Version			:	1
	
Description		:	Adds the adv. Inspect probing cycle to the ribbon. 
	
Disclaimer		:	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.									
*/
//---------------------------------------------------------------
// ANCHOR                          DECLARATIONS
//---------------------------------------------------------------

SetPCIVariable("_checkHelp",1);
//SetPCIVariable("$TabName", "Nieuw tabblad");
//SetPCIVariable("$PanelName", "Nieuw paneel");
SetPCIVariable("_list_ThemeLocation", 1);


f_log = "";
//---------------------------------------------------------------
// ANCHOR                         MAIN PROGRAM
iRet = main();
//---------------------------------------------------------------

function main() {

	nRet = AskBox(["Naam van tabblad", "Naam van paneel", "Theme locatie^USER^NETWORKLOCATION", "Theme naam", "Uitleg ipv uitvoeren"],["$TabName", "$PanelName", "_list_ThemeLocation", "$ThemeName", "_checkHelp"]);
	if (nRet == _FINISH){

		if(GetPCIVariable("_checkHelp") == 1){
			nRet=MessageBox(_MB_OK + _MB_ICONINFORMATION ,"Voeg eerst een nieuw LEEG paneel toe aan een tabblad in de ribbon.\nSla het profiel op en herstart deze pci met het vinkje \"Uitleg ipv uitvoeren\" uit om de PCI echt te starten.\n\nVul de velden in met de naam van het paneel, het tabblad waarop het paneel staat, de naam van het profiel/thema en de locatie van het thema.\nNa het succesvol uitvoeren kan het profiel/thema herladen worden en zal de Geavanceerd Inspect Probing cyclus toegevoegd zijn.\n\nEr wordt een backup gemaakt van ribbon.xml als ribbon.xml.bak.");
			return 3;
		}

		var TabName = GetPCIVariable("$TabName");
		var PanelName = GetPCIVariable("$PanelName");
		var ThemeName = GetPCIVariable("$ThemeName");
		var ThemeLocation;
		
		if (GetPCINumber("_list_ThemeLocation") == 1){
			ThemeLocation = GetPCIVariable("&EDGEUSER");
		}
		else {
			ThemeLocation = GetPCIVariable("&EDGEMASTER");
		}

		ThemeLocation = ThemeLocation + "\\Themes\\" + ThemeName + "\\ribbon\\ribbon.xml";
		

		nRet2 = parseXML(ThemeLocation, TabName, PanelName);

		if (nRet2 == 1){
			nRet=MessageBox(_MB_OK + _MB_ICONINFORMATION ,"herlaad het profiel " + ThemeName);
			return nRet2;
		}
		else if (nRet2 == 2){
			nRet=MessageBox(_MB_OK + _MB_ICONERROR  ,"Theme " + ThemeName + " is niet gevonden!");
			return nRet2;
		}
	}
}

//---------------------------------------------------------------
// ANCHOR                         FUNCTIONS
//---------------------------------------------------------------


function AddToLog(target, value){
	//Display(value + "\n");
}

function parseXML(myFile, TabName, PanelName){
	var text = "";
	fso = new ActiveXObject("Scripting.FileSystemObject");

	if (fso.FileExists(myFile)==false) {
		return 1;
	}

	fso.CopyFile(myFile, myFile+".bak", _TRUE);

	ForReading = 1;
	ts = fso.OpenTextFile(myFile, ForReading);
	var CATEGORY_flag = false;
	var PANEL_flag = false;
	var TabFound = false;
	var PanelFound = false;

	while (!ts.AtEndOfStream)
	{
        var line = ts.ReadLine();
		  if (line.indexOf("<BUTTON_INFO>") > 0){
			  line = line + InsertButton();
		  }

		  if (line.indexOf("<BUTTON_INFO/>") > 0){
			line = "<BUTTON_INFO>" + InsertButton() + "\n\t\t</BUTTON_INFO>";
		  }



		  if (line.indexOf("<CATEGORY>") > 0){
			CATEGORY_flag = true;
		  }
		  else if (line.indexOf("</CATEGORY>") > 0){
			CATEGORY_flag = false;
		  }

		  if (line.indexOf("<PANEL>") > 0){
			AddToLog(f_log,"PANEL_flag = true");
			PANEL_flag = true;
		  }
		  else if (line.indexOf("</PANEL>") > 0){
			PANEL_flag = false;
			AddToLog(f_log,"PANEL_flag = false");
		  }


		if (CATEGORY_flag == true && line.indexOf("<NAME>" + TabName + "</NAME>") > 0){
			  TabFound == true;
			  AddToLog(f_log,"TabFound = true");
		  }

		if (CATEGORY_flag == true && PANEL_flag == true && line.indexOf("<NAME>" + PanelName + "</NAME>") > 0){
			AddToLog(f_log,"PanelFound = true");
			PanelFound = true;
			line = line + InsertPanel()
		}

		  AddToLog(f_log,line);
		  text = text + line;
	}
	ts.Close();


	ts = fso.CreateTextFile(myFile , true);
	ts.writeline(text);
	ts.Close();
	return 2;
}

function InsertPanel(){
	return "\n" + 
	"\t\t\t\t\t\t<ELEMENTS>\n" +
	"\t\t\t\t\t\t\t<ELEMENT>\n" + 
	"\t\t\t\t\t\t\t\t<ELEMENT_NAME>Button</ELEMENT_NAME>\n" +
	"\t\t\t\t\t\t\t<ID>\n" + 
	"\t\t\t\t\t\t\t<VALUE>50828</VALUE>\n" + 
	"\t\t\t\t\t\t\t</ID>\n" + 
	"\t\t\t\t\t\t\t</ELEMENT>\n" + 
	"\t\t\t\t\t\t</ELEMENTS>\n" 
}

function InsertButton(){
	return "\n" + 
	"\t\t\t<BUTTON>\n" +
	"\t\t\t\t<ID>\n" + 
	"\t\t\t\t\t<VALUE>50828</VALUE>\n" +
	"\t\t\t\t</ID>\n" + 
	"\t\t\t\t<BUTTON_TEXT>Geavanceerde Inspect Tastcyclus</BUTTON_TEXT>\n" + 
	"\t\t\t\t<FLAGS>2</FLAGS>\n" + 
	"\t\t\t</BUTTON>"

}