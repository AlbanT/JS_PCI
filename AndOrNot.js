var x = 4;
var y = 3;
var z = 1;
// ALS x is 4 EN (y is geen 1 OF z is 0)
if (x==4 && (!(y==1) || z==0)) {
    alert("true");
}
else {
    alert("false");
}

y = 1;
if (x==4 && (!(y==1) || z==0)) {
    alert("true");
}
else {
    alert("false aangezien y=1");
}
z = 0;
if (x==4 && (!(y==1) || z==0)) {
    alert("true aangezien z=0");
}
else {
    alert("false");
}