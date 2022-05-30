var myFeature = 105; // feature entity number

Query(myFeature, true);

SetAttribute("Feature.Mill.WallSurface.SurfaceRoughness", 0.3);

var cmd1 = InitCommand(50, 682); // Accept All Features command
var cmdret = ExecCommand(cmd1, -1);