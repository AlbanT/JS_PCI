// Preset values on the AskBox by setting a PCI variable to a value (optional)
function AskBoxValues(){
SetPCIVariable("_realVar", "123.123");
SetPCIVariable("_intVar", "5");
SetPCIVariable("_checkVar", "1"); //set to 0 off or 1 on
SetPCIVariable("_listVar", "2");     // set to second item in the list
SetPCIVariable("$_textVar", "This is text");
SetPCIVariable("$_mtextVar", ""); //clear value i.e. set it to blank

nret = AskBox(["Real", "Integer", "List^Option1^Option2^Option3", "Mill Type", "String", "Multi-line Text", "Check Box"], ["_realVar", "_intVar", "_listVar","_LIST5","$_textVar","$_mtextVar","_checkVar"]);

// Get the PCI variables set by the AskBox (required)
var rVar            = GetPCIVariable("_realVar");
var nVar            = GetPCIVariable("_intVar");
var nCheckVar       = GetPCIVariable("_checkVar");
var strVar          = GetPCIVariable("$_textVar");
var strMultiLineVar = GetPCIVariable("$_mtextVar");
var nListVar        = GetPCIVariable("_listVar");

// All variables are returned as strings. Convert the strings to numbers where needed.
rVar = Number(rVar);
nVar = Number(nVar);

// check strings are now numbers by adding them together
x = rVar + nVar;

alert("Real = "+rVar+"\nInt   = "+nVar+"\nSum   = "+x);

if (strMultiLineVar == "")
    alert("Multi-line text variable has not been set");
else
    alert("Mtext = \""+strMultiLineVar+"\"");
return;
}
AskBoxValues (); 