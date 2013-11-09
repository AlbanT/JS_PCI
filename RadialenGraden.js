var myAngle = 180;

alert(myAngle + 
        " degrees is equal to " + AngleInRadians(myAngle) + " radians\n" + 
        AngleInRadians(myAngle) + " radians is equal to " + 
        AngleInDegrees(AngleInRadians(myAngle)) + " degrees");

function AngleInRadians(angle) {
    return angle * (Math.PI / 180);
}

function AngleInDegrees(angle) {
    return angle * (180 / Math.PI);
}