var Result = "6" + 4;		//Result = 64
Result = Number("6") + 4	//Result = 10
Result = "7" * "4" 			//Result = 28
Result = "7" + "4" 			//Result = 74
Result = Number("7") + Number("4")	//Result = 11
Result = 1 - "x"; 			//Result = NaN = -1,#IND: NaN = Not A Number
Result = false;
var NewResult = String(Result);	//NewResult = "false"
NewResult = Result.toString;	//NewResult = "false"
alert(isNaN(123)); 				// false as 123 is a number
alert(isNaN("hello"));			// true as hello is Not A Number