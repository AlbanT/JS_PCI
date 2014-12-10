var wsh = new ActiveXObject("WScript.Shell");
var key = "HKEY_CURRENT_USER\\Software\\Planit\\Cls\\2014.20\\License\\Configured License Mask";
var key_value = wsh.RegRead(key);


var Field = key_value.split(",");

var x;
var Licenses = "";
for (x in Field) {
       if (Field[x] != "") {
             Licenses = Licenses + LicenseName(Field[x]) + "\n";
       }
}

alert(Licenses);


function LicenseName(LicenseID) {
       switch (LicenseID) {
             case "2":
                    return "Edgecam Standard Milling" 
                    break;
             case "22":
                    return "Edgecam Advanced Milling" 
                    break;
             case "8":
                    return "Edgecam Essential Milling" 
                    break;
             case "9":
                    return "Edgecam Ultimate Milling" 
                    break;
             case "23":
                    return "Edgecam Standard Turning" 
                    break;
             case "3":
                    return "Edgecam Essential Turning" 
                    break;
             case "18":
                    return "Edgecam Ultimate Turning" 
                    break;
             case "20":
                    return "Edgecam Advanced Turning" 
                    break;
             case "4":
                    return "Edgecam Standard production" 
                    break;
             case "21":
                    return "Edgecam Essential Production" 
                    break;
             case "16":
                    return "Edgecam Advanced Production" 
                    break;
             case "10":
                    return "Edgecam Ultimate Production" 
                    break;
             case "95":
                    return "Edgecam Reseller Software" 
                    break;
             case "95":
                    return "Edgecam Reseller Software"
                    break;
             case "94":
                    return "Reseller Key"
                    break;
             case "42":
                    return "Advanced Customisation" 
                    break;
             case "78":
                    return "Edgecam Solid CAD/CAM" 
                    break;
             case "19":
                    return "EdgeCAM Part Modeler" 
                    break;
             case "24":
                    return "Edgecam Shop Floor Editor" 
                    break;
             case "48":
                    return "Preview" 
                    break;
             case "62":
                    return "Edgecam Solid Machinist Max" 
                    break;
             case "41":
                    return "Code Generator Compiler" 
                    break;
             case "59":
                    return "CATIA V4 Loader" 
                    break;
             case "43":
                    return "Advanced 5-Axis Simultaneous Milling" 
                    break;
             case "81":
                    return "5-Axis Simultaneous Milling" 
                    break;
             case "65":
                    return "EdgeCAM Strategy Manager" 
                    break;
             case "80":
                    return "4-Axis Simultaneous Milling"
                    break;
             case "82":
                    return "5-Axis Simultaneous Milling for Education" 
                    break;
             case "50":
                    return "Edgecam Solid Machinist for Education"
                    break;
             case "11":
                    return "EdgeCAM Educational"
                    break;
             default:
                    return LicenseID + " is a unknown license" 
       }
}
