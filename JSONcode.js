var JSONstring = 
{
	"Commands": [
		{
			"$type": "JSONPCI.Command, JSONPCI",
			"Name": "Line",
			"Verb": 2,
			"Noun": 1,
			"Modifiers": {
				"155": {"ID": 155, "Name": "Polyline", "Value": "<Yes>"},
				"1":   {"ID": 1, "Name": "Colour", "Value": "Green|1"},
				"3":   {"ID": 3, "Name": "Layer", "Value": "Geometry"},
				"2":   {"ID": 2, "Name": "Style", "Value": "Solid|0"}
			},
			"Picks": [
				{"CoordString": "X0Y0Z0"},
				{"CoordString": "X100"},
				{"CoordString": "Y100"},
				{"CoordString": "X0"},
				{"CoordString": "Y0"},
				{"PickKey": _FINISH}
			]
		}
	]
}

ExecuteProcessJSON(JSON.stringify(JSONstring));