//myLibrary.js

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str)}

String.prototype.trim = function()
{return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")}

function AngleInRadians(angle) {
    return angle * (Math.PI / 180);
}

function AngleInDegrees(angle) {
    return angle * (180 / Math.PI);
}

function NormalizedAngle(angle,center) {
    var TWO_PI = 2 * Math.PI;  
    return AngleInDegrees(AngleInRadians(angle) - TWO_PI * 
        Math.floor((AngleInRadians(angle) + Math.PI - center) / TWO_PI));
}

function Afronden(Getal, Decimalen)
{
    return Math.round(Getal * Math.pow(10,Decimalen)) / Math.pow(10,Decimalen);
}