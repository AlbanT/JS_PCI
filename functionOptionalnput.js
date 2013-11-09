function OptionalExample(A,B,C) {
		if (A == undefined) {
			A = 1;
		}
		if (B == undefined) {
			B = 2;
		}
		if (C == undefined) {
			C = 3;
		}
		
		return Number(A) + Number(B) + Number(C)
	}

	var result = OptionalExample(5,2,8); // => 15
	result = OptionalExample(undefined,2,8); // => 11
	result = OptionalExample(undefined,undefined,undefined); // => 6