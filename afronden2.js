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

alert(Math.PI + " afgerond op 5 decimalen is " + Round(Math.PI,5));  // 3.14159
alert("23 afgerond naar de dichtstbijzijnde veelvoud van 5 = " + RoundNearest(23,5) + "\n" +
      "22 afgerond naar de dichtstbijzijnde veelvoud van 5 = " + RoundNearest(23,5)); // 25 and 20

function Round(Value, Decimals) {
    return Math.round(Value * Math.pow(10,Decimals)) / Math.pow(10,Decimals);
}

function RoundNearest(Value,Nearest) {
    return Math.ceil(Value / Nearest) * Nearest;
}