var Test = parseInt("3 blind mice"); // => 3
Test = Number("3 blind mice");	// => NaN
Test = parseFloat(" 3.14 meters"); // => 3.14
Test = parseInt("-12.34"); // => -12
Test = parseInt("0xFF"); // => 255
Test = parseFloat("$72.47"); // => NaN