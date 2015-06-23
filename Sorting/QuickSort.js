
var input = [4, 3, 7, 2, 1, 4, 5, 8];

var output = QuickSort(input);
alert("input = [" + input + "]\n" + "output = [" + output + "]");

 
 
function QuickSort(arr)
{
    var stack = [arr];
    var sorted = [];
 
    while (stack.length) {
 
        var temp = stack.pop(), tl = temp.length;
 
        if (tl == 1) {
            sorted.push(temp[0]);
            continue;
        }
        var pivot = temp[0];
        var left = [], right = [];
 
        for (var i = 1; i < tl; i++) {
            if (temp[i] < pivot) {
                left.push(temp[i]);
            } else {
                right.push(temp[i]);
            }
        }
 
        left.push(pivot);
 
        if (right.length)
            stack.push(right);
        if (left.length)
            stack.push(left);
 
    }
 
    Display(sorted + "\\");
	return sorted;
}
