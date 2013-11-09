//Based upon: http://www.javascriptkit.com/javatutors/round.shtml
//original is Eulers number = 2.718281828459045
var original = Math.E;
// round "original" to 0 decimals = 3
var result0 = Math.round(original);
// round "original" to 1 decimal = 2.7
var result1 = Math.round(original*10)/10
//round "original" to two decimals = 2.72
var result2 = Math.round(original*100)/100
//round "original" to 3 decimals = 2.718
var result3 = Math.round(original*1000)/1000
//round "original" to X=5 decimals = 2.71828
var X = 5;
var resultX = Math.round(original * Math.pow(10,X)) / Math.pow(10,X);   
//round "original" up to the next integer = 3   
var resultCeil = Math.ceil(original);
//round "original" down to the next integer = 2   
var resultFloor = Math.floor(original);
alert(original + "\n" + result0 + "\n" + result1 +  "\n" + result2 +  "\n" + result3 +  "\n" + resultX +  "\n" + resultCeil +  "\n" + resultFloor); 


alert(Math.PI + " afgerond op 5 decimalen is " + Afronden(Math.PI,5));

function Afronden(Getal, Decimalen)
{
    return Math.round(Getal * Math.pow(10,Decimalen)) / Math.pow(10,Decimalen);
}