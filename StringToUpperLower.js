var String1 = "Widenhorn";
var String2 = "widenhorn";
	if (String1 == String2) {
		alert(String1 + " = " + String2);
	}
	else {
		alert(String1 + " != " + String2);	//Widenhorn != widenhorn
	}
	if (String1.toLowerCase() == String2.toLowerCase()) {
		alert(String1.toLowerCase() + " = " + String2.toLowerCase());	//widenhorn = widenhorn
	}
	else {
		alert(String1.toLowerCase() + " != " + String2.toLowerCase());
	}

	if (String1.toUpperCase() == String2.toUpperCase()) {
		alert(String1.toUpperCase() + " = " + String2.toUpperCase());	//WIDENHORN = WIDENHORN
	}
	else {
		alert(String1.toUpperCase() + " != " + String2.toUpperCase());
	}