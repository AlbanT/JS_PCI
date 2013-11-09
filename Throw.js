var Values=[2,12,"Six"];
var Index;
for (Index in Values) {
    try {
      if(Values[Index]>10) {
        throw "Err1";
      }
      else if(Values[Index]<5) {
        throw "Err2";
      }
      else if(isNaN(Values[Index])) {     //NaN = Not a Number 
        throw "Err3";
      }
    }
    catch(err) {
      if(err=="Err1") {
        alert("Error! The value is too high.");
      }
      if(err=="Err2") {
        alert("Error! The value is too low.");
      }
      if(err=="Err3") {
        alert("Error! The value is not a number.");
      }
    }
}