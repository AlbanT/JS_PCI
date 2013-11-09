var Pi = 3.14159265;
var Phi = 1.618033988749895;

var Result = (Pi * Phi) * 1000;	//5083.20368650685

var strResult = Result.toFixed(5);		//5083.20369
strResult = Result.toExponential(5);	//5.08320e+3
strResult = Result.toPrecision(5);   	//5083.2

var RoundedResult = Number(Result.toFixed(5));

var WrongResult = RoundedResult / 1000;	// 5.08320369
Result = Result / 1000;					// 5.083203686506853

var Difference = Result - WrongResult;	// -3.4931471049048923e-9