var entity = {WIDTH: 0, HEIGHT: 1, DEPTH: 2};

var foo = GetEntityDimensions(61);
alert("Width = " + foo[entity.WIDTH] + "\n" + "Height = " + foo[entity.HEIGHT] + "\n"  + "Depth = " + foo[entity.DEPTH] + "\n");



function GetEntityDimensions(EntNo) {
	
	var data = GetEntityData(Number(EntNo), 0, _DATAFLAG_WORLD_COORDS, _EXTRADATA_BOUNDING_BOX ); 	// extract the JSON string of the entity
	Display(data + "\n");
	
	var Coord = {X: 0, Y: 1, Z: 2};		// for readability we use an Enum as X, Y and Z in the array        
	
	var obj = JSON.parse(data);	// parse the JSON string into a JS object
		
	var Point1 = [obj.boundingbox.min.x, obj.boundingbox.min.y, obj.boundingbox.min.z];  // extract the X, Y and Z coordinates of the entity's startpoint
	var Point2 = [obj.boundingbox.max.x, obj.boundingbox.max.y, obj.boundingbox.max.z];  // extract the X, Y and Z coordinates of the entity's endpoint
	
	var width = Math.max(Point1[Coord.X], Point2[Coord.X]) - Math.min(Point1[Coord.X], Point2[Coord.X]); 
	var height = Math.max(Point1[Coord.Y], Point2[Coord.Y]) - Math.min(Point1[Coord.Y], Point2[Coord.Y]);
	var depth = Math.max(Point1[Coord.Z], Point2[Coord.Z]) - Math.min(Point1[Coord.Z], Point2[Coord.Z]);

	var result = [width, height, depth]; // Calculate the Height and Width and store the values in an array
	return result;
	
	
}