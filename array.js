//Conventional array
var ToolType = new Array();
ToolType[0] = "Frees";
ToolType[1] = "Boor";
ToolType[2] = "Beitel";

//Condensed array
var tooltype = new Array("Frees","Boor","Beitel");

//Literal one dimensional array
var TOOLTYPE = ["Frees","Boor","Beitel"];

//Literal multi dimensional array
var TOOLtype =[["A","B","C"],["D","E","F"],["G","H","I"]]

alert(ToolType[0]); //resultaat is "Frees"
alert(tooltype[2]); //resultaat is "Beitel"
alert(TOOLTYPE[1]); //resultaat is "Boor"
alert(TOOLtype[1][0]); //resultaat is "D"