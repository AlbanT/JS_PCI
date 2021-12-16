/// <reference path="C:\Program Files\Hexagon\EDGECAM 2022.0\cam\PCI\pci-jsdoc.js" />

/*
 PCI to create a new VS Code intellisense file supporting JSdoc
*/

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str)}



var targetFile = GetPCIVariable("&EDGELOCAL") + "\\PCI\\pci-jsdoc.js";

var output = "";
var output_line = "";
var function_name = undefined;
var function_description;

var param = {name: "", description: "", type: ""};
var param_array = [];
var function_array = [];
var xml_array = [];
var head_array = [];

var summary_flag = false;
var param_flag = false;
var returns_flag = false;
var firstFunction = false;

var sourceFile = GetPCIVariable("&EDGELOCAL") + "\\PCI\\pci-vsdoc.js";

// Read Text File
fso = new ActiveXObject("Scripting.FileSystemObject");
ForReading = 1;
ts = fso.OpenTextFile(sourceFile, ForReading);
s  = "";

while (!ts.AtEndOfStream)
{
	s = ts.ReadLine();

	if (s.startsWith("function") && s.startsWith("function Handle(){}") == false){
		// function line
		function_name = s.replace("{", "");



		firstFunction = true;

		//Display(function_name + "\n");
	}


	if (s.startsWith("/// <reference path=")){
		s = s.replace("pci-vsdoc.js", "pci-jsdoc.js")
	}
	
	
	if (firstFunction == false)  {
		if (s.startsWith("var")){
			if (s.endsWith(";") == false) {
				s += ";";
			}
			s = "/** @type {constant} " + s.substring(s.indexOf("="), s.indexOf(";")) + "*/" + "\n" + s;
		}
		head_array.push(s);
	}

	if (s.startsWith("}") && function_name != undefined){
		// end of function
		output = 
		"/**" + "\n" + 
		" * " + function_description + "\n";

		for (p in param_array) {
			output += param_array[p] + "\n";

			//Display(param_array[p] + "\n");
		}
		param_array = []; // clear the array so it can be used for the next function



		output += " */" + "\n" + function_name + "{" + "\n";

		//for (x in xml_array) {
		//	output += xml_array[x] + "\n";
		//}
		xml_array = [];

		output += "}" + "\n";

		//Display(output + "\n");

		function_array.push(output);
		function_name = undefined;
	}

	if (s.startsWith("\t///") && function_name != undefined){
		// found XML comment line

		s=s.replace("/// ", "///\t");

		xml_array.push(s);

		if (s.startsWith("\t/// <summary>") || s.startsWith("\t///\t<summary>")){
			summary_flag = true;

		}
		else if (s.startsWith("\t///\t<param name=")){
			// found parameter info
			param_flag = true;

			param.name = s.replace("\t///	<param name=\"", "");
			param.name = param.name.substr(0,param.name.indexOf("\""));

			param.type = s.replace("\t///	<param name=\"" + param.name + "\" type=\"","");
			param.type = param.type.substr(0,param.type.indexOf("\""));
		}
		else if (s.startsWith("\t///\t<returns")){
			// found returns info
			param.type = s.replace("\t///\t<returns type=\"","");
			param.type = param.type.substr(0,param.type.indexOf("\""));

			param_array.push(" * @returns {" + param.type + "} ");
		}


		if (summary_flag == true && s.startsWith("\t///\t<") == false){
			// found the actual summary text
			function_description = s.replace("\t///\t","");
			//Display("function_description = " +function_description + "\n");
		}


		if (param_flag == true && s.startsWith("\t///\t<") == false){
			// found parameter description
			param.description = s.replace("\t///\t\t","");
			//Display("param.description = " + param.description + "\n");
		}

		if (s.startsWith("\t///\t</param")){
			// end of parameter
			param_flag = false;
			//output_line = " * @param {" + param.type + "} " + param.name + " - " + param.description;
			param_array.push(" * @param {" + param.type + "} " + param.name + " - " + param.description);
		}
		else if (s.startsWith("\t///\t</summary")){
			// end of summary
			summary_flag = false;
		}




	}



	var return_value = "";

	for (x in head_array){
		return_value += head_array[x] + "\n";
	}

	return_value += "function Handle(){}" + "\n\n";

	for (f in function_array){
		return_value += function_array[f] + "\n";
	}

// Create Text File
//fso = new ActiveXObject("Scripting.FileSystemObject");
f = fso.CreateTextFile(targetFile, true);

f.writeline(return_value);

f.Close();





}
ts.Close();

