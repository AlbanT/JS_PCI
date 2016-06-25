
// array of coordinates of each vertex of the polygon
var polygon = [[0.747,1.321],[1.296,2.479],[2.788,1.93],[2.957,1.087],[2.211,0.995],[2.139,1.53],[1.442,1.804],[1.367,1.055]];
alert(inside([ 0.630,1.616 ], polygon)); 
alert(inside([ 1.107,1.504 ], polygon)); 
alert(inside([ 1.756,1.324 ], polygon)); 
alert(inside([ 2.568,1.341 ], polygon)); 
alert(inside([ 1.828,2.039 ], polygon)); 
alert(inside([ 1.885,2.444 ], polygon)); 




function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};