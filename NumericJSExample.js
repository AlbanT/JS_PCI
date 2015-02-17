// Include the numeric.js library: http://numericjs.com/index.php:
Include("numeric-1.2.6.js");

// Startpoint:
var Point = [2, 1];

// Angle to rotate the Startpoint around X0Y0:
var RotationInDegrees = 270;

// XY distance to translate the Startpoint after it is rotated:
var Translation = [3, 4];

// Trigonometry uses radians rather than degrees
// http://en.wikipedia.org/wiki/Radian
var RotationInRadians = AngleInRadians(RotationInDegrees);

// http://en.wikipedia.org/wiki/Rotation_matrix
var Phi = RotationInRadians;
var Rotation = [[Math.cos(Phi), -1 * Math.sin(Phi)],
                [Math.sin(Phi),    Math.cos(Phi)  ]];

// perform the rotation: PointAfterRotation = Point * Rotation:
var PointAfterRotation = numeric.dot(Point, Rotation);

// perform the translation: PointAfterTranslation = PointAfterRotation + Translation
var PointAfterTranslation = numeric.add(PointAfterRotation, Translation);

// show the result to the user:
alert("(" + PointAfterTranslation[0].toFixed(2) + "," + PointAfterTranslation[1].toFixed(2) + ")");

function AngleInRadians(angle) {
	/// <summary>
	/// Converts a given angle from degrees to radians
	/// </summary>
	/// <param name="angle">angle in degrees</param>
	/// <returns type="">angle in radians</returns>
    return angle * (Math.PI / 180);
}

function AngleInDegrees(angle) {
	/// <summary>
    ///  Converts a given angle from radians to degrees
	/// </summary>
	/// <param name="angle"angle in radians></param>
	/// <returns type="">angle in degrees</returns>
    return angle * (180 / Math.PI);
}