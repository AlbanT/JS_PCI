/// <reference path="C:\Program Files\Vero Software\Edgecam 2016 R2\cam\PCI\pci-vsdoc.js" />

/*\
|*|
|*|	Machine setup with full use of CL-T library
|*|
|*|	Written by	: Menno Engelhardt		Date: 2014-01-30
|*|	email		: m.engelhardt@kmwe.com
|*|
|*|	http://www.w3schools.com/js/
|*|	http://www.javascriptobfuscator.com/
|*|
\*/

Main_Menu();

function Main_Menu() {					// Hoofdmenu
	dir_2 				=	GetPCIVariable("$!textPciName").substring(0, GetPCIVariable("$!textPciName").lastIndexOf("\\"));
	dir_html			=	dir_2 + "";


	if(FloatWebForm (dir_html + "\\test.html", -1, -1, 1035, 735, 1, 1, 1 ) )  {
		setPCIvariable("doc_name",document.title);
		var doc_name = GetPCIVariable("doc_name");
		alert(doc_name);
	}
}




