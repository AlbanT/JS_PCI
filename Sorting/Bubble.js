// source: http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/

var input = [34, 203, 3, 746, 200, 984, 198, 764, 9];

var output = bubbleSortDebug(input);
alert("input = [" + input + "]\n" + "output = [" + output + "]");

function bubbleSort(input) {
	var a = input.slice(0);
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);	
	return a;
}

// this function prints the iterations to the feedback window in Edgecam to show how it works
function bubbleSortDebug(input) {
	var a = input.slice(0);
	var debug = "Bubble Sort Start" + "\n\n" + "a = [" + a + "]" + "\n";
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
		debug = debug + "step " + (i+1) + ": ";
            if (a[i] > a[i+1]) {
				debug = debug + a[i] + " > " + a[i+1] + " => swap them" + "\n";
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
			else {
				debug = debug + a[i] + " < " + a[i+1] + " => leave them" + "\n";
			}
        }
		
		if (swapped == true) {
			debug = debug + "a = [" + a + "]" + "\n" + "repeat the steps" + "\n\n" + "a = [" + a + "]" + "\n";
		} 
		else {
			debug = debug + "No more swaps are made" + "\n" + "finished sorting" + "\n" + "a = [" + a + "]";
		}
    } while (swapped);
	
	Display(debug);
	
	return a;
}
