var Angle = 45;
var SinusAngle = Math.sin(AngleInRadians(Angle));
alert("Sinus(" + Angle + ") = " + AngleInDegrees(SinusAngle))

function AngleInRadians(Degrees) {
    return Degrees * (Math.PI / 180);
}

function AngleInDegrees(Radians) {
    return Radians * (180/ Math.PI);
}

//Er kunnen meerdere input variabelen gebruikt worden:
function Afronden(Getal, Decimalen) {
    return Math.round(Getal * Math.pow(10,Decimalen)) / Math.pow(10,Decimalen);
}