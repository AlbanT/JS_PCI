// Create an instance of the box class
var Box1 = new box(100,50,25);
var Box2 = new box(50,30,25);

alert("Box1 = " + Box1.length + " x " + Box1.width + " x " + Box1.height + "\n" +
	  "   Volume = " + Box1.volume + "\n" + 
	  "   Area = " + Box1.area + "\n\n" +
	  "Box2 = " + Box2.length + " x " + Box2.width + " x " + Box2.height + "\n" +
	  "   Volume = " + Box2.volume + "\n" + 
	  "   Area = " + Box2.area);


function box(length,width,height) {
	this.length = length;
	this.width = width;
	this.height = height;
	this.volume = length * width * height;
	this.area = (2*(length * width)) + (2*(width * height)) + (2*(height * length));
}
