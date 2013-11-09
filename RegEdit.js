var wsh = new ActiveXObject("WScript.Shell");
var key = "HKCU\\Software\\Widenhorn\\truetemp\\test";

//write the key to the registry:
wsh.RegWrite(key, "hello world", "REG_SZ");

//read the value back from the registry
var key_value = wsh.RegRead(key);
alert(key_value);

//delete the key from the registry
wsh.RegDelete(key);