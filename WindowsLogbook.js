/* write data into the Windows logbook */
var oWSS = new ActiveXObject("WScript.Shell"); 
oWSS.LogEvent(1,"this is error"); 
oWSS.LogEvent(2,"this is warning"); 
oWSS.LogEvent(4,"this is Info");

