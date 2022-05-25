/// <reference path="c:\program files\vero software\edgecam 2017 r2\cam\PCI\pci-vsdoc.js" />

/* https://esupport.ps.hexagonmi.com/edgecam/f/5-pci-javascript-pdi-plugins/59590/extracting-wireframe-from-feature-perimeter/291136 */

_ETYPE_RADIAL_MILL_FEAT_ENT = 223;

var aETypes = ["CONT_MILL_FEAT_ENT",
    "_3D_MILL_FEAT_ENT",
    "FACES_FEAT_ENT",
    "VERT_MILL_FEAT_ENT",
    "IFEATURE_HOLE_FEAT_ENT",
    "EDGE_LOOP_FEAT_ENT",
    "OPEN_POCKET_FEAT_ENT",
    "TURN_IFEATURE_FEAT_ENT",
    "FLAT_FACE_FEAT_ENT",
    "COMPOSITE_FEAT_ENT",
    "ROTARY_MILL_FEAT_ENT"
];

var nEntSt = GetPCINumber("&BASEENT");
var nEntNd = GetPCINumber("&NEXTENT") - 1;

for (var i = nEntSt; i <= nEntNd; i++) {
    var nRet = -1;
    if (nRet = Query(i, true)) {
        var nEntType = GetPCINumber("&EType");
        if (nEntType >= _ETYPE_CONT_MILL_FEAT && nEntType <= _ETYPE_RADIAL_MILL_FEAT_ENT) {
            var nIdx = 0;
            var sz = "Feature - Entno = " + i + " Name = '" + GetAttribute("Feature.Name") + "' Type = '" + aETypes[nEntType - 213] + "' - Has KIIDs = ";
            while (nKIID = GetAttribute("Feature.Creation.SolidIds[" + nIdx++ + "]")) {
                sz += nKIID + ", ";
            }
            Display(sz + "\n");
        }
    }
}


Display("Done\n");