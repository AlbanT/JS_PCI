nRet = Ask("Geef lengte", "length");

switch (nRet) {
    case _FINISH:
    	alert("de gebruiker heeft op OK knop geklikt");
    break;
    case _ABORT:
    	alert("de gebruiker heeft op de Annuleren knop geklikt");
    break;
}

switch (nRet) {
    case -3:
    	alert("de gebruiker heeft op OK knop geklikt");
    break;
    case -1:
    	alert("de gebruiker heeft op de Annuleren knop geklikt");
    break;
}