var DecimalValue = 17;
var BinaryValue = DecimalValue.toString(2); // => "10001"
var OctalValue = "0" + DecimalValue.toString(8); // => "021"
var HexValue = "0x" + DecimalValue.toString(16); // => "0x11"

DecimalValue = parseInt(BinaryValue,2); // => 17
DecimalValue = parseInt(OctalValue,8); // => 17
DecimalValue = parseInt(HexValue,16); // => 17