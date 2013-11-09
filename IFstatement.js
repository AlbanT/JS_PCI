var Value1 = 5;
var Value2 = 3;

if (Value1 > Value2) {
    alert(Value1 + " is bigger then " + Value2);
    }
else {
    alert(Value1 + " is NOT bigger then " + Value2);
}

/* Merk op dat onderstaande PCI hetzelfde doet als bovenstaande JavaScript, de PCI is duidelijk onoverzichtelijker door de noodzaak om het GoTo statement te gebruiken:
%CALC=Value1=5
%CALC=Value2=3

%IF [Value1]>[Value2] %GOTO=True
%DISPLAY=[Value1] is NOT bigger then [Value2]
%GOTO=Jump
%LABEL=True
    %DISPLAY=[Value1] is bigger then [Value2]
%LABEL=Jump
*/