var strPrompt = "Selecteer een locatie";
nRet = AskDig(strPrompt, "strVar");
alert("nRet=" + nRet);

if (nRet > 0) { //OK is pressed
    alert("User selected:" + 
        " X" + GetPCIVariable("X@strVar") + 
        " Y" + GetPCIVariable("Y@strVar") + 
        " Z" + GetPCIVariable("Z@strVar"));
}function DigValues(){

nRet = AskDig("Pick Something", "PICK");
alert("nRet=" + nRet);

if (nRet <0 ) {
    return;
}

// Get the Enity Type number and define a real name. Use Number() to convert a string variable
switch (Number(GetPCIVariable("&ETYPE"))) {
    case 1: entitytype = "line";break;
    case 2: entitytype = "Arc";break;
    case 4: entitytype = "Point";break;
    case 5: entitytype = "Conic curve section";break;
    case 6: entitytype = "Helix";break;
    case 7: entitytype = "Bezier curve";break;
    case 8: entitytype = "Spline curve";break;
    case 9: entitytype = "B-spline curve";break;
    case 10: entitytype = "Continuous";break;
    case 11: entitytype = "Group";break;
    case 12: entitytype = "Symbol";break;
    case 13: entitytype = "Surface group";break;
    case 14: entitytype = "Generic collection entity - composite";break;
    case 15: entitytype = "Generic collection entity - shared";break;
    case 21: entitytype = "Construction line";break;
    case 22: entitytype = "Construction arc";break;
    case 24: entitytype = "Construction point";break;
    case 30: entitytype = "Arrow";break;
    case 31: entitytype = "Witness line";break;
    case 32: entitytype = "Text";break;
    case 33: entitytype = "Font";break;
    case 34: entitytype = "Linear dimension";break;
    case 35: entitytype = "Angular dimension";break;
    case 36: entitytype = "Diametral dimension";break;
    case 38: entitytype = "Hatch area ";break;
    case 50: entitytype = "Ruled Surface";break;
    case 51: entitytype = "Surface of revolution";break;
    case 52: entitytype = "Tabulated cylinder surface ";break;
    case 53: entitytype = "Coons patch Surface";break;
    case 54: entitytype = "Spline Surface";break;
    case 55: entitytype = "B-Spline Surface";break;
    case 56: entitytype = "B?er Surface ";break;
    case 57: entitytype = "Flowed Surface" ;break;
    case 58: entitytype = "Offset Surface";break;
    case 59: entitytype = "Fillet Surface";break;
    case 60: entitytype = "Trimmed Surface";break;
    case 61: entitytype = "Joined Surface";break;
    case 65: entitytype = "Surface Curve";break;
    case 66: entitytype = "Toolpath poly";break;
    case 67: entitytype = "Mesh";break;
    case 68: entitytype = "Digital surface";break;
    case 69: entitytype = "Newpoly";break;
    case 100: entitytype = "Matrix";break;
    case 150: entitytype = "Associativity";break;
    case 151: entitytype = "Property";break;
    case 152: entitytype = "Sweep";break;
    case 153: entitytype = "List";break;
    case 154: entitytype = "Parm";break;
    case 155: entitytype = "Unwrap";break;
    case 156: entitytype = "Wrap";break;
    case 157: entitytype = "Wire (Linked)";break;
    case 158: entitytype = "Wire (Tapered) ";break;
    case 159: entitytype = "Wire (Transformed)";break;
    case 160: entitytype = "Solid info";break;
    case 161: entitytype = "Solid body";break;
    case 162: entitytype = "Solid face";break;
    case 163: entitytype = "Solid loop";break;
    case 164: entitytype = "Solid edge";break;
    case 165: entitytype = "Solid vertex";break;
    case 171: entitytype = "STL entity";break;
    case 201: entitytype = "Toolpath ";break;
    case 202: entitytype = "Mod";break;
    case 203: entitytype = "Exmod";break;
    case 204: entitytype = "Gd_info";break;
    case 205: entitytype = "Gd_group";break;
    case 206: entitytype = "CPL";break;
    case 207: entitytype = "Layout";break;
    case 208: entitytype = "View SplitterMap";break;
    case 209: entitytype = "Layers";break;
    case 210: entitytype = "Tool Load";break;
    case 211: entitytype = "Attribute";break;
    case 212: entitytype = "Feature Attribute";break;
    case 213: entitytype = "Pocket, boss or profile with contoured walls feature";break;
    case 214: entitytype = "Pocket, boss or profile with 3D walls feature ";break;
    case 215: entitytype = "Set of faces feature";break;
    case 216: entitytype = "Pocket, boss or profile with vertical walls feature";break;
    case 217: entitytype = "Formed, Radial, 3+2,etc, grouped or single hole as feature";break;
    case 218: entitytype = "Edge Loop feature";break;
    case 219: entitytype = "Open Pocket feature";break;
    case 220: entitytype = "Turn feature (V12.25 and later)";break;
    case 221: entitytype = "Flat Face feature";break;
    case 222: entitytype = "Composite feature";break;
    case 250: entitytype = "Stock feature ";break;
    case 251: entitytype = "Fixture feature";break;
    case 252: entitytype = "Used to store spun stock profile";break;
    case 255: entitytype = "All entity types";break;
    default: entitytype = "unkown";
    }


hMsg = InitMessageString();
AddMessageString(hMsg, "Entity No. " + GetPCIVariable("&ENTNO") + "  Name " + GetPCIVariable("&ENAME") + " Type " + entitytype);
AddMessageString(hMsg," ");
AddMessageString(hMsg, "Direction " + GetPCIVariable("&DIRFLAG") + "  Port " + GetPCIVariable("&PORT") + " DigStat " + GetPCIVariable("&DIGSTAT"));
AddMessageString(hMsg," ");
AddMessageString(hMsg, "DIG  X" + GetPCIVariable("&XDIG") + " Y" + GetPCIVariable("&YDIG") + " Z" + GetPCIVariable("&ZDIG"));
AddMessageString(hMsg," ");
AddMessageString(hMsg, "SNAP X" + GetPCIVariable("&XSNAP") + " Y" + GetPCIVariable("&YSNAP") + " Z" + GetPCIVariable("&ZSNAP"));
AddMessageString(hMsg," ");
AddMessageString(hMsg, "PICK X" + GetPCIVariable("X@PICK") + " Y" + GetPCIVariable("Y@PICK") + " Z" + GetPCIVariable("Z@PICK"));


MessageBox(_MB_ICONINFORMATION, hMsg);
FreeMessageString(hMsg);

return;
}

DigValues ();