
// This VAR object is used for easier readability
var VAR = {
    length: 0,
    width: 1,
    height: 2
};

// SetPCIVariable("ScriptName(0)",100);
SetPCIVariable("ScriptName(" + VAR.length + ")",100);	

// SetPCIVariable("ScriptName(1)",50);
SetPCIVariable("ScriptName(" + VAR.width + ")",50);	

// SetPCIVariable("ScriptName(2)",30);
SetPCIVariable("ScriptName(" + VAR.height + ")",30);	