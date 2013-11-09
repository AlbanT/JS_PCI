function AngleInRadians(angle) {
    return angle * (Math.PI / 180);
}

function AngleInDegrees(angle) {
    return angle * (180 / Math.PI);
}

function NormalizedAngle(angle,center) {
    //	http://www.java2s.com/Tutorial/Java/0120__Development/Normalizeanangleina2piwideintervalaroundacentervalue.htm

    var TWO_PI = 2 * Math.PI;  
    return AngleInDegrees(AngleInRadians(angle) - TWO_PI * 
		Math.floor((AngleInRadians(angle) + Math.PI - center) / TWO_PI));
}

//indien center=0 is het resultaat tussen -180 en +180 en als center=Pi is het resultaat tussen 0 en 360
alert("3430 graden is gelijk aan " + NormalizedAngle(3430,0) + " graden (-180 -> +180)" + 
"\n" + "3430 graden is gelijk aan " + NormalizedAngle(3430,Math.PI) + " graden (0 -> +360)"); 