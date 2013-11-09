nRet = Ask("Geef lengte", "length");
if (nRet == _FINISH)  //user pressed OK
{
    alert("Lengte =" + GetPCIVariable("length"));
} 
else
{  
    alert("Gebruiker heeft op Annuleren geklikt"); 
}	