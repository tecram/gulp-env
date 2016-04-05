(function () {
	"use strict";
	var a = 2,
		b = [4, 5, 6, 1],
		f= 0;
	
	var testAsd = function (param) {
		switch (param) {
			case 1:
				f= 1;
				break;
			default:
				f= 0;
				break;
		}
	}

	var testIf = function (f) {
		if(f !== 1) {
			//asd
		}
		else {
			//asd
		}
		return;
	}

	var testEmpty = function () {
		return;
	}

	var ffAs = function (param) {
		return param;
	}

	testAsd(a);
	testIf(f);
	testEmpty();
	ffAs(b);
	
}());