// if you add the comment below as the first line in your JavaScript files then
// Visual Studio will read this file and provide intellisense and in-line documentation 
// Note: you must substitute the <path to Edgecam> with the folder in which you 
// installed Edgecam

/// <reference path="<path to Edgecam>\Cam\PCI\pci-jsdoc.js" />

// constants
/** @type {constant} =241*/
var _FREEDIG=241;
/** @type {constant} =242*/
var _ENTITYDIG=242;
/** @type {constant} =-3*/
var _FINISH=-3;
/** @type {constant} =-2*/
var _ESCAPE=-2;
/** @type {constant} =-1*/
var _ABORT=-1;
/** @type {constant} =12*/
var _DIG_ENTNODIG=12;
/** @type {constant} =14*/
var _DIG_ENTNAME_DIG=14;
/** @type {constant} =11*/
var _DIG_COORDSTR=11;
/** @type {constant} =1*/
var _DIG_LOCATION=1;
/** @type {constant} =2*/
var _DIG_WORLD=2;
/** @type {constant} =3*/
var _DIG_VIEW=3;
/** @type {constant} =4*/
var _DIG_SCREEN=4;
/** @type {constant} =9*/
var _DIG_UVSURF=9;
/** @type {constant} =7*/
var _DIG_PORTNUMBER=7;
/** @type {constant} =8*/
var _DIG_ELEMENT=8;
/** @type {constant} =10*/
var _DIG_CONSTRUCT_REF=10;
/** @type {constant} =13*/
var _DIG_COMPONENT_INFO=13;
/** @type {constant} =1*/
var _CMD_REFERENCE=1;
/** @type {constant} =2*/
var _CMD_MIDPOINT=2;
/** @type {constant} =3*/
var _CMD_CENTRE=3;
/** @type {constant} =4*/
var _CMD_X_ON_ENT=4;
/** @type {constant} =5*/
var _CMD_Y_ON_ENT=5;
/** @type {constant} =6*/
var _CMD_INTOF=6;
/** @type {constant} =7*/
var _CMD_LENGTH=7;
/** @type {constant} =8*/
var _CMD_BISECT=8;
/** @type {constant} =0*/
var _DIR_FORWARD=0;
/** @type {constant} =1*/
var _DIR_REVERSE=1;
/** @type {constant} =2*/
var _DIG_CHAIN=2;
/** @type {constant} =1*/
var _DIG_3DSNAP=1;
/** @type {constant} =1*/
var _TRUE=1;
/** @type {constant} =0*/
var _FALSE=0;
/** @type {constant} =0*/
var _DIG_2DSNAP=0;
/** @type {constant} =15*/
var _DIG_REL_WORLD=15;
/** @type {constant} =3*/
var _PROF_CLOSED=3;
/** @type {constant} =6*/
var _PROF_OPEN=6;
/** @type {constant} =0*/
var _MB_OK=0;
/** @type {constant} =1*/
var _MB_OKCANCEL=1;
/** @type {constant} =3*/
var _MB_YESNOCANCEL=3;
/** @type {constant} =4*/
var _MB_YESNO=4;
/** @type {constant} =32*/
var _MB_ICONQUESTION=32;
/** @type {constant} =64*/
var _MB_ICONINFORMATION=64;
/** @type {constant} =48*/
var _MB_ICONWARNING=48;
/** @type {constant} =16*/
var _MB_ICONERROR=16;
/** @type {constant} =256*/
var _MB_DEFBUTTON2=256;
/** @type {constant} =512*/
var _MB_DEFBUTTON3=512;
/** @type {constant} =768*/
var _MB_NODEFBUTTON=768;
/** @type {constant} =524288*/
var _MB_RIGHT=524288;
/** @type {constant} =1*/
var _MB_RET_OK=1;
/** @type {constant} =2*/
var _MB_RET_CANCEL=2;
/** @type {constant} =6*/
var _MB_RET_YES=6;
/** @type {constant} =7*/
var _MB_RET_NO=7;
/** @type {constant} =-1*/
var _PROF_SIDE_DIGITISE=-1;
/** @type {constant} =0*/
var _PROF_SIDE_CENTRE=0;
/** @type {constant} =1*/
var _PROF_SIDE_LEFT=1;
/** @type {constant} =2*/
var _PROF_SIDE_RIGHT=2;
/** @type {constant} =1*/
var _METRIC=1;
/** @type {constant} =0*/
var _IMPERIAL=0;
/** @type {constant} =1*/
var _MILL_ENV=1;
/** @type {constant} =2*/
var _TURN_ENV=2;
/** @type {constant} =1*/
var _COORD_CPL=1;
/** @type {constant} =2*/
var _COORD_WORLD=2;
/** @type {constant} =3*/
var _COORD_INITIAL_MACHINE=3;
/** @type {constant} =1*/
var _ETYPE_LINE=1;
/** @type {constant} =2*/
var _ETYPE_ARC=2;
/** @type {constant} =4*/
var _ETYPE_POINT=4;
/** @type {constant} =5*/
var _ETYPE_CONIC=5;
/** @type {constant} =7*/
var _ETYPE_BEZCURVE=7;
/** @type {constant} =8*/
var _ETYPE_SPLCURVE=8;
/** @type {constant} =9*/
var _ETYPE_BSPCURVE=9;
/** @type {constant} =10*/
var _ETYPE_CONTIN=10;
/** @type {constant} =11*/
var _ETYPE_GROUP=11;
/** @type {constant} =14*/
var _ETYPE_BLOCK=14;
/** @type {constant} =217*/
var _ETYPE_HOLE_FEATURE=217;
/** @type {constant} =22*/
var _ETYPE_CON_ARC=22;
/** @type {constant} =50*/
var _ETYPE_R_SURF=50;
/** @type {constant} =51*/
var _ETYPE_S_REV=51;
/** @type {constant} =52*/
var _ETYPE_T_CYL=52;
/** @type {constant} =53*/
var _ETYPE_COON=53;
/** @type {constant} =54*/
var _ETYPE_SPL_SURF=54;
/** @type {constant} =55*/
var _ETYPE_BSP_SURF=55;
/** @type {constant} =56*/
var _ETYPE_BEZ_SURF=56;
/** @type {constant} =57*/
var _ETYPE_FLO_SURF=57;
/** @type {constant} =58*/
var _ETYPE_OSURF=58;
/** @type {constant} =59*/
var _ETYPE_FILLET=59;
/** @type {constant} =60*/
var _ETYPE_TRIM_SURF=60;
/** @type {constant} =61*/
var _ETYPE_JOINED_SURF=61;
/** @type {constant} =161*/
var _ETYPE_BREP_ENT=161;
/** @type {constant} =171*/
var _ETYPE_TRIMESH_ENT=171;
/** @type {constant} =213*/
var _ETYPE_CONT_MILL_FEAT=213;
/** @type {constant} =214*/
var _ETYPE_3D_MILL_FEAT=214;
/** @type {constant} =215*/
var _ETYPE_FACES_FEAT=215;
/** @type {constant} =216*/
var _ETYPE_VERT_MILL_FEAT=216;
/** @type {constant} =219*/
var _ETYPE_OPEN_POCKET_FEAT=219;
/** @type {constant} =221*/
var _ETYPE_FLAT_FACE_FEAT=221;
/** @type {constant} =222*/
var _ETYPE_COMPOSITE_FEAT=222;
/** @type {constant} =220*/
var _ETYPE_TURN_IFEATURE_FEAT=220;
/** @type {constant} =4*/
var _DIG_TANGENT=4;
/** @type {constant} =8*/
var _DIG_2DCHAIN=8;
/** @type {constant} =4096*/
var _DOCK_LEFT=4096;
/** @type {constant} =8192*/
var _DOCK_TOP=8192;
/** @type {constant} =16384*/
var _DOCK_RIGHT=16384;
/** @type {constant} =32768*/
var _DOCK_BOTTOM=32768;
/** @type {constant} =61440*/
var _DOCK_ANY=61440;
/** @type {constant} =1*/
var _MODIFIER_ENABLED=1;
/** @type {constant} =2*/
var _MODIFIER_READONLY=2;
/** @type {constant} =60*/
var _TMP_FILES_CFG_REC=60;
/** @type {constant} =96*/
var _DFT_FILE_CFG_REC=96;
/** @type {constant} =99*/
var _PDI_CAT_CFG_REC=99;
/** @type {constant} =101*/
var _PAMS_RUN_CFG_REC=101;
/** @type {constant} =172*/
var _TOOL_LOG_CFG_REC=172;
/** @type {constant} =205*/
var _PDI_SRC_CFG_REC=205;
/** @type {constant} =211*/
var _TOOL_DIR_CFG_REC=211;
/** @type {constant} =213*/
var _PDI_MENU_CFG_REC=213;
/** @type {constant} =217*/
var _LANGUAGE_CFG_REC=217;
/** @type {constant} =218*/
var _LOCAL_LANG_CFG_REC=218;
/** @type {constant} =226*/
var _MACHDEF_CFG_REC=226;
/** @type {constant} =236*/
var _MACHINES_CFG_REC=236;
/** @type {constant} =250*/
var _TEMPLATE_CFG_REC=250;
/** @type {constant} =255*/
var _PCI_OPERATIONS_CFG_REC=255;
/** @type {constant} =275*/
var _CACHE_PATH_CFG_REC=275;
/** @type {constant} =284*/
var _TSTORE_SVR_CFG_REC=284;
/** @type {constant} =285*/
var _TSTORE_SUP_DIR_CFG_REC=285;
/** @type {constant} =286*/
var _STRATEGY_FOLDER_CFG_REC=286;
/** @type {constant} =287*/
var _DEFAULT_STRATEGY_FOLDER_CFG_REC=287;
/** @type {constant} =288*/
var _AUXILIARY_STRATEGY_FOLDER_CFG_REC=288;
/** @type {constant} =296*/
var _SUPPORT_IMAGES_CFG_REC=296;
/** @type {constant} =298*/
var _SUPPORT_TOOLS_CFG_REC=298;
/** @type {constant} =299*/
var _SUPPORT_COMMANDS_CFG_REC=299;
/** @type {constant} =301*/
var _SUPPORT_PROFILES_CFG_REC=301;
/** @type {constant} =302*/
var _SUPPORT_PTVARS_CFG_REC=302;
/** @type {constant} =303*/
var _SUPPORT_DFT_CFG_REC=303;
/** @type {constant} =304*/
var _JOBREPORT_DIRECTORY_CFG_REC=304;
/** @type {constant} =305*/
var _SUPPORT_USER_IMAGES_CFG_REC=305;
/** @type {constant} =306*/
var _NETWORK_LOCATION_CFG_REC=306;
/** @type {constant} =307*/
var _FEATURE_TEMPLATE_CFG_REC=307;
/** @type {constant} =309*/
var _DWG_LOG_PATH_CFG_REC=309;
/** @type {constant} =310*/
var _SUB_STRATEGY_FOLDER_CFG_REC=310;
/** @type {constant} =311*/
var _TEMP_LOCATION_CFG_REC=311;
/** @type {constant} =331*/
var _PCI_INCLUDE_PATH_CFG_REC=331;
/** @type {constant} =335*/
var _IMAGES_FOLDER_CFG_REC=335;
/** @type {constant} =338*/
var _WORKFLOW_STRATEGY_FOLDER_CFG_REC=338;
/** @type {constant} =339*/
var _TSTORE_EMBED_JOB_IMAGES_CFG_REC=339;
/** @type {constant} =340*/
var _EWS_DIR_CFG_REC=340;
/** @type {constant} =342*/
var _CURRENT_WORKFLOW_CFG_REC=342;
/** @type {constant} =1*/
var _EXTRADATA_KIID=1;
/** @type {constant} =2*/
var _EXTRADATA_BOUNDING_BOX=2;
/** @type {constant} =0*/
var _DATAFLAG_CPL_COORDS=0;
/** @type {constant} = 1*/
var _DATAFLAG_WORLD_COORDS = 1;
/** @type {constant} = 1*/
var _FINDENTNO_FROM_START = 1;
/** @type {constant} = -1*/
var _FINDENTNO_FROM_BASEENT = -1;
/** @type {constant} = -2*/
var _FINDENTNO_FROM_END = -2;


function Handle(){}

/**
 * Creates a docked WebForm window at the edge of the screen specified by nDockEdge and loads the specified web page.
 * @param {String} strURL - the file or URL to be displayed
 * @param {Number} nDockEdge - _DOCK_LEFT, _DOCK_TOP, _DOCK_RIGHT, _DOCK_BOTTOM or _DOCK_ANY
 * @param {Boolean} bShowOk - display an OK button on the docked window
 * @param {Boolean} bShowCancel - display a Cancel button on the docked window
 * @param {Boolean} bWait - halt execution until either the OK or Cancel button is pressed
 * @returns {Number} 
 */
function DockWebForm(strURL, nDockEdge, bShowOk, bShowCancel, bWait){
}

/**
 * FloatWebForm(strURL, x, y, cx, cy, bShowOk, bShowCancel, bWait)
 * @param {String} strURL - strURL
 * @param {Number} x - x
 * @param {Number} y - y
 * @param {Number} cx - cx
 * @param {Number} cy - cy
 * @param {Boolean} bShowOk - bShowOk
 * @param {Boolean} bShowCancel - bShowCancel
 * @param {Boolean} bWait - bWait
 * @returns {Number} 
 */
function FloatWebForm(strURL, x, y, cx, cy, bShowOk, bShowCancel, bWait){
}

/**
 * HideWebForm()
 */
function HideWebForm(){
}

/**
 * GetPCIVariable(strPCIVar)
 * @param {String} strPCIVar - strPCIVar
 * @returns {String} 
 */
function GetPCIVariable(strPCIVar){
}

/**
 * GetPCIVariable(strPCIVar)
 * @param {String} strPCIVar - strPCIVar
 * @returns {Number} 
 */
function GetPCINumber(strPCIVar){
}

/**
 * SetPCIVariable(strPCIVar, strVal)
 * @param {String} strPCIVar - strPCIVar
 * @param {String} strVal - strVal
 */
function SetPCIVariable(strPCIVar, strVal){
}

/**
 * SetPCIVariable(strPCIVar, strVal)
 */
function SetPCINumber(strPCIVar, rVal) {
}

/**
 * alert(strPCIVar)
 * @param {String} strPCIVar - strPCIVar
 * @returns {Number} 
 */
function alert(strPCIVar){
}

/**
 * Include(strFile)
 * @param {String} strFile - strFile
 * @returns {Number} 
 */
function Include(strFile){
}

/**
 * Benchmark()
 */
function Benchmark(){
}

/**
 * 	InitCommand(verb , noun) - Initialises a command from within a PCI. Each call of this function returns a handle, which is a unique reference to that instance of the command and is required with all subsequent references to it.
 * @param {Number} nVerb - Verb ID (see edgekrnl.txt)
 * @param {Number} nNoun - Noun ID (see edgekrnl.txt)
 * @returns {Handle} 
 */
function InitCommand(nVerb, nNoun) {
}

/**
 * 	InitCommand(verb , noun, outofcontext, maskname) - Initialises a command from within a PCI. Each call of this function returns a handle, which is a unique reference to that instance of the command and is required with all subsequent references to it.
 * @param {Number} nVerb - Verb ID (see edgekrnl.txt)
 * @param {Number} nNoun - Noun ID (see edgekrnl.txt)
 * @param {Boolean} bOutOfContext - Out-of-context flag. Normally false. Set to true if out of context.
 * @param {String} szMask - Name of the command mask to use when editing this command in the sequence browser.
 * @returns {Handle} 
 */
function InitCommandMasked(nVerb, nNoun, bOutOfContext, szMask) {
}

/**
 * 	ExecCommand(handleCmd, handlePick)
 * @param {Handle} handleCmd - handleCmd
 * @param {Handle} handlePick - handlePick
 * @returns {Number} 
 */
function ExecCommand(handleCmd, handlePick){
}

/**
 * ClearMods(handleCmd)
 * @param {Handle} handleCmd - handleCmd
 */
function ClearMods(handleCmd){
}

/**
 * SetModifier(handleCmd, nMod, strValue)
 * @param {Handle} handleCmd - handleCmd
 * @param {Number} nMod - nMod
 * @param {String} strValue - strValue
 */
function SetModifier(handleCmd, nMod, strValue){
}

/**
 * SetModifierEx(handleCmd, nMod, nVMCChain, nVMCElement, strModifierValue, strElementValue)
 * @param {Handle} handleCmd - handleCmd
 * @param {Number} nMod - nMod
 * @param {Number} nVMCChain - nMod
 * @param {Number} nVMCElement - nMod
 * @param {String} strModifierValue - strValue
 * @param {String} strElementValue - strValue
 */
function SetModifierEx(handleCmd, nMod, nVMCChain, nVMCElement, strModifierValue, strElementValue){
}

/**
 * InitDigInfo()
 * @returns {Handle} 
 */
function InitDigInfo(){
}

/**
 * AddFinisPickHandle(handlePick, nDig)
 * @param {Handle} handlePick - handlePick
 * @param {Number} nDig - PARAM
 */
function AddFinisPickHandle(handlePick, nDig){
}

/**
 * FreeDigInfo(handlePick)
 * @param {Handle} handlePick - handlePick
 */
function FreeDigInfo(handlePick){
}

/**
 * AskDigInfoEx(strVarNumDig, strPrompt, handlePick, nDigType, strEntityTypes, strValidSmod, bMultiDig, bTurningCPL)
 * @param {String} strVarNumDig - strVarNumDig
 * @param {String} strPrompt - strPrompt
 * @param {Handle} handlePick - handlePick
 * @param {Number} nDigType - nDigType
 * @param {String} strEntityTypes - strEntityTypes
 * @param {String} strValidSmod - strValidSmod
 * @param {Boolean} bMultiDig - bMultiDig
 * @param {Boolean} bTurningCPL - bTurningCPL
 * @returns {Number} 
 */
function AskDigInfoEx(strVarNumDig, strPrompt, handlePick, nDigType, strEntityTypes, strValidSmod, bMultiDig, bTurningCPL){
}

/**
 * AskDigInfo(strPrompt, handlePick, nDigType, strEntityTypes, strValidSmod, bMultiDig)
 * @param {String} strPrompt - strPrompt
 * @param {Handle} handlePick - handlePick
 * @param {Number} nDigType - nDigType
 * @param {String} strEntityTypes - strEntityTypes
 * @param {String} strValidSmod - strValidSmod
 * @param {Boolean} bMultiDig - bMultiDig
 * @returns {Number} 
 */
function AskDigInfo(strPrompt, handlePick, nDigType, strEntityTypes, strValidSmod, bMultiDig){
}

/**
 * AddAllVisDigInfo(handlePick, strEntityTypes)
 * @param {Handle} handlePick - handlePick
 * @param {String} strEntityTypes - strEntityTypes
 * @returns {Number} 
 */
function AddAllVisDigInfo(handlePick, strEntityTypes){
}

/**
 * AddCallbackReference(handleOp, strCallback, nIndex, hCommand, nModifier)
 * @param {Handle} handleOp - strEntityTypes
 * @param {String} strCallback - strEntityTypes
 * @param {Number} nIndex - strEntityTypes
 * @param {Handle} hCommand - strEntityTypes
 * @param {Number} nModifier - strEntityTypes
 */
function AddCallbackReference(handleOp, strCallback, nIndex, hCommand, nModifier){
}

/**
 * AddCallbackReference(handleOp, strCallback, nIndex, hCommand, nModifier)
 */
function AddCallbackReferenceEx(hOp, strCallback, nIndex, strVal) {
}

/**
 * AddCmdModToOperation(handleOp, handleCmd, nModifier, strTab, nExclusivity, strVarDefaultValue)
 * @param {Handle} handleOp - handleOp
 * @param {Handle} handleCmd - handleCmd
 * @param {Number} nModifier - nModifier
 * @param {String} strTab - strTab
 * @param {Number} nExclusivity - nExclusivity
 * @param {String} strVarDefaultValue - strVarDefaultValue
 * @returns {Number} 
 */
function AddCmdModToOperation(handleOp, handleCmd, nModifier, strTab, nExclusivity, strVarDefaultValue){
}

/**
 * AddEntNameDig(handlePick, strEntName, nDir, nSnap)
 * @param {Handle} handlePick - handlePick
 * @param {String} strEntName - strEntName
 * @param {Number} nDir - nDir
 * @param {Number} nSnap - nSnap
 */
function AddEntNameDig(handlePick, strEntName, nDir, nSnap){
}

/**
 * AddEntnoDig(handlePick, nEntno, nDir, nSnap)
 * @param {Handle} handlePick - handlePick
 * @param {Number} nEntno - nEntno
 * @param {Number} nDir - nDir
 * @param {Number} nSnap - nSnap
 */
function AddEntnoDig(handlePick, nEntno, nDir, nSnap){
}

/**
 * AddEntNameTopologyDig(handlePick, strEntName, nTopology, nDir, nSnap)
 * @param {Handle} handlePick - handlePick
 * @param {String} strEntName - strEntName
 * @param {Number} nTopology - nTopology
 * @param {Number} nDir - nDir
 * @param {Number} nSnap - nSnap
 */
function AddEntNameTopologyDig(handlePick, strEntName, nTopology, nDir, nSnap){
}

/**
 * AddEntnoTopologyDig(handlePick, nEntno, nTopology, nDir, nSnap)
 * @param {Handle} handlePick - handlePick
 * @param {Number} nEntno - nEntno
 * @param {Number} nTopology - nTopology
 * @param {Number} nDir - nDir
 * @param {Number} nSnap - nSnap
 */
function AddEntnoTopologyDig(handlePick, nEntno, nTopology, nDir, nSnap){
}

/**
 * AddFreeDig(handlePick, strCoordString)
 * @param {Handle} handlePick - handlePick
 * @param {String} strCoordString - strCoordString
 */
function AddFreeDig(handlePick, strCoordString){
}

/**
 * AddMessageString(hMsg, strMessage)
 * @param {Handle} hMsg - hMsg
 * @param {String} strMessage - PARAM
 */
function AddMessageString(hMsg, strMessage){
}

/**
 * AddUserModToOperation(handleOp, strVar, strPrompt, strTab, nExclusivity, strVarDefaultValue)
 * @param {Handle} handleOp - handleOp
 * @param {String} strVar - strVar
 * @param {String} strPrompt - strPrompt
 * @param {String} strTab - strTab
 * @param {Number} nExclusivity - nExclusivity
 * @param {String} strVarDefaultValue - strVarDefaultValue
 */
function AddUserModToOperation(handleOp, strVar, strPrompt, strTab, nExclusivity, strVarDefaultValue){
}

/**
 * AddValidStateUserMod(handleOp, strVar, nValue, strVarDependent, nState)
 * @param {Handle} handleOp - handleOp
 * @param {String} strVar - strVar
 * @param {Number} nValue - nValue
 * @param {String} strVarDependent - strVarDependent
 * @param {Number} nState - nState
 */
function AddValidStateUserMod(handleOp, strVar, nValue, strVarDependent, nState){
}

/**
 * AddValidStateCmdMod(handleOp, strVar, nValue, handleCmd, nModID, nState)
 * @param {Handle} handleOp - handleOp
 * @param {String} strVar - strVar
 * @param {Number} nValue - nValue
 * @param {Handle} handleCmd - handleCmd
 * @param {Number} nModID - nModID
 * @param {Number} nState - nState
 */
function AddValidStateCmdMod(handleOp, strVar, nValue, handleCmd, nModID, nState){
}

/**
 * Alias(strVarAlias, strVar)
 * @param {String} strVarAlias - strVarAlias
 * @param {String} strVar - strVar
 */
function Alias(strVarAlias, strVar){
}

/**
 * AliasModalVar(strVarAlias, nVerb, nNoun, nModifier)
 * @param {String} strVarAlias - strVarAlias
 * @param {Number} nVerb - nVerb
 * @param {Number} nNoun - nNoun
 * @param {Number} nModifier - nModifier
 */
function AliasModalVar(strVarAlias, nVerb, nNoun, nModifier){
}

/**
 * Ang(rXInc, rYInc)
 * @param {Number} rXInc - rXInc
 * @param {Number} rYInc - rYInc
 * @returns {Number} 
 */
function Ang(rXInc, rYInc){
}

/**
 * Ask(strPrompt, strVar)
 * @param {String} strPrompt - strPrompt
 * @param {String} strVar - strVar
 * @returns {Number} 
 */
function Ask(strPrompt, strVar){
}

/**
 * AskBox(strPromptArray, strVarArray)
 * @param {String} strPromptArray - strPromptArray
 * @param {String} strVarArray - strVarArray
 * @returns {Number} 
 */
function AskBox(strPromptArray, strVarArray){
}

/**
 * AskDig(strPrompt, strVar)
 * @param {String} strPrompt - strPrompt
 * @param {String} strVar - strVar
 * @returns {Number} 
 */
function AskDig(strPrompt, strVar){
}

/**
 * AskMods(handleCmd)
 * @param {Handle} handleCmd - handleCmd
 * @returns {Number} 
 */
function AskMods(handleCmd){
}

/**
 * AskProfile(strPrompt, handlePick, nType, nSide)
 * @param {String} strPrompt - strPrompt
 * @param {Handle} handlePick - handlePick
 * @param {Number} nType - nType
 * @param {Number} nSide - nSide
 * @returns {nDig} 
 */
function AskProfile(strPrompt, handlePick, nType, nSide){
}

/**
 * AskSurfaces(strPrompt, handlePick, nSide, nAutoSide)
 * @param {String} strPrompt - strPrompt
 * @param {Handle} handlePick - handlePick
 * @param {Number} nSide - nSide
 * @param {Number} nAutoSide - nAutoSide
 * @returns {Number} 
 */
function AskSurfaces(strPrompt, handlePick, nSide, nAutoSide){
}

/**
 * InitOperation(strName, strHelpFileName, nHelpId)
 * @param {String} strName - strName
 * @param {String} strHelpFileName - strHelpFileName
 * @param {Number} nHelpId - nHelpId
 * @returns {Handle} 
 */
function InitOperation(strName, strHelpFileName, nHelpId){
}

/**
 * ExecCommandEx(handleCmd, handlePickArray)
 * @param {Handle} handleCmd - handleCmd
 * @param {Array} handlePickArray - handlePickArray
 * @returns {Number} 
 */
function ExecCommandEx(handleCmd, handlePickArray){
}

/**
 * CleanDigInfo(handlePick)
 * @param {Handle} handlePick - handlePick
 * @returns {Number} 
 */
function CleanDigInfo(handlePick){
}

/**
 * DoOperationMods(handleOp)
 * @param {Handle} handleOp - handleOp
 * @returns {Number} 
 */
function DoOperationMods(handleOp){
}

/**
 * DoOperationMods(handleOp)
 */
function CommitOperation(handleOp, handlePickArray) {
}

/**
 * DoOperationMods(handleOp)
 */
function CommitOperationEx(handleOp, handlePickArray, FastOperation) {
}

/**
 * FreeOperation(handleOp)
 * @param {Handle} handleOp - handleOp
 */
function FreeOperation(handleOp){
}

/**
 * InitMessageString()
 * @returns {Handle} 
 */
function InitMessageString(){
}

/**
 * MessageBox(nStyle, strMessage)
 * @param {Number} nStyle - nStyle
 * @param {String} strMessage - strMessage
 * @returns {Number} 
 */
function MessageBox(nStyle, strMessage){
}

/**
 * FreeMessageString(hMsg)
 * @param {Handle} hMsg - hMsg
 */
function FreeMessageString(hMsg){
}

/**
 * ToolbarMods(bUseToolbar)
 * @param {Boolean} bUseToolbar - bUseToolbar
 */
function ToolbarMods(bUseToolbar){
}

/**
 * Query(strEntity, bCPL)
 * @param {String} strEntity - strEntity
 * @param {Boolean} bCPL - bCPL
 * @returns {Number} 
 */
function Query(strEntity, bCPL){
}

/**
 * QueryDigInfo(handlePick, nElement)
 * @param {Handle} handlePick - handlePick
 * @param {Number} nElement - nElement
 * @returns {Number} 
 */
function QueryDigInfo(handlePick, nElement){
}

/**
 * SetCallback(strCallback, handleOp, handleCmd, nModifier)
 * @param {String} strCallback - strCallback
 * @param {Handle} handleOp - handleOp
 * @param {Handle} handleCmd - handleCmd
 * @param {Number} nModifier - nModifier
 */
function SetCallback(strCallback, handleOp, handleCmd, nModifier){
}

/**
 * SetPackage(nPackage)
 * @param {Number} nPackage - nPackage
 */
function SetPackage(nPackage){
}

/**
 * Display(strMessage)
 * @param {String} strMessage - strMessage
 */
function Display(strMessage){
}

/**
 * Calc(strVar, strExpression)
 * @param {String} strVar - strVar
 * @param {String} strExpression - strExpression
 */
function Calc(strVar, strExpression){
}

/**
 * Len(strStr)
 * @param {String} strStr - strStr
 * @returns {Number} 
 */
function Len(strStr){
}

/**
 * Mid(strStr, nStart, nLength, )
 * @param {String} strStr - strStr
 * @param {Number} nStart - nStart
 * @param {Number} nLength - nLength
 * @returns {String} 
 */
function Mid(strStr, nStart, nLength){
}

/**
 * Wait(nSeconds)
 * @param {String} nSeconds - nSeconds
 */
function Wait(nSeconds){
}

/**
 * Option(strPrompt)
 * @param {String} strPrompt - strPrompt
 * @returns {Number} 
 */
function Option(strPrompt){
}

/**
 * MessageListBox(strTitle, strOptions, nDefault)
 * @param {String} strTitle - strTitle
 * @param {String} strOptions - strOptions
 * @param {Number} nDefault - nDefault
 * @returns {Number} 
 */
function MessageListBox(strTitle, strOptions, nDefault){
}

/**
 * Error(nEnable)
 * @param {Number} nEnable - nEnable
 */
function Error(nEnable){
}

/**
 * Delete(strVar)
 * @param {String} strVar - strVar
 */
function Delete(strVar){
}

/**
 * DeleteAllVars(nDeleteAll)
 * @param {Number} nDeleteAll - nDeleteAll
 */
function DeleteAllVars(nDeleteAll){
}

/**
 * Response(nResponse)
 * @param {Number} nResponse - nResponse
 */
function Response(nResponse){
}

/**
 * PadText(strText, nJustification, nLength)
 * @param {String} strText - strText
 * @param {Number} nJustification - nJustification
 * @param {Number} nLength - nLength
 * @returns {String} 
 */
function PadText(strText, nJustification, nLength){
}

/**
 * ChainEntno(handlePick, nStartEnt, nEndEnt, nDirection, n3DSnap, bBranch)
 * @param {Handle} handlePick - handlePick
 * @param {Number} nStartEnt - nStartEnt
 * @param {Number} nEndEnt - nEndEnt
 * @param {Number} nDirection - nDirection
 * @param {Number} n3DSnap - n3DSnap
 * @param {Boolean} bBranch - bBranch
 * @returns {Number} 
 */
function ChainEntno(handlePick, nStartEnt, nEndEnt, nDirection, n3DSnap, bBranch){
}

/**
 * ChainEntName(handlePick, strStartEntName, strEndEntName, nDirection, n3DSnap, bBranch)
 * @param {Handle} handlePick - handlePick
 * @param {String} strStartEntName - strStartEntName
 * @param {String} strEndEntName - strEndEntName
 * @param {Number} nDirection - nDirection
 * @param {Number} n3DSnap - n3DSnap
 * @param {Boolean} bBranch - bBranch
 * @returns {Number} 
 */
function ChainEntName(handlePick, strStartEntName, strEndEntName, nDirection, n3DSnap, bBranch){
}

/**
 * LoadTool(handleCmd, strToolName)
 * @param {Handle} handleCmd - handleCmd
 * @param {String} strToolName - strToolName
 * @returns {Number} 
 */
function LoadTool(handleCmd, strToolName){
}

/**
 * GetModifier(handleCmd, nModifier, strVar)
 * @param {Handle} handleCmd - handleCmd
 * @param {Number} nModifier - nModifier
 * @param {String} strVar - strVar
 * @returns {Number} 
 */
function GetModifier(handleCmd, nModifier, strVar){
}

/**
 * CopyModifiers(HandleSrc, HandleDst, strMods)
 * @param {Handle} HandleSrc - HandleSrc
 * @param {Handle} HandleDst - HandleDst
 * @param {String} strMods - strMods
 */
function CopyModifiers(HandleSrc, HandleDst, strMods){
}

/**
 * IsToolSame(handleCmd)
 * @param {Handle} handleCmd - handleCmd
 * @returns {Number} 
 */
function IsToolSame(handleCmd){
}

/**
 * IsVarDefined(strVar)
 * @param {String} strVar - strVar
 * @returns {Number} 
 */
function IsVarDefined(strVar){
}

/**
 * ReInitCommand(handleCmd)
 * @param {Handle} handleCmd - handleCmd
 */
function ReInitCommand(handleCmd){
}

/**
 * SetFeatureVars(handlePick)
 * @param {Handle} handlePick - handlePick
 */
function SetFeatureVars(handlePick){
}

/**
 * Undo()
 */
function Undo(){
}

/**
 * GetAttribute(strAttribute)
 * @param {String} strAttribute - strAttribute
 * @returns {String} 
 */
function GetAttribute(strAttribute){
}

/**
 * SetAttribute(strAttribute, strValue)
 * @param {String} strAttribute - strAttribute
 * @param {String} strValue - strValue
 */
function SetAttribute(strAttribute, strValue){
}

/**
 * sets path to error log
 * @param {String} strErrorLog - 	///	path to error log
 */
function SetErrorLog(strErrorLog){
}

/**
 * End()
 */
function End(){
}

/**
 * BeginDigArray(handlePick, nDigType)
 * @param {Handle} handlePick - handlePick
 * @param {Number} nDigType - nDigType
 */
function BeginDigArray(handlePick, nDigType){
}

/**
 * AddDigArray(handlePick)
 * @param {Handle} handlePick - handlePick
 */
function AddDigArray(handlePick){
}

/**
 * AddDigInfoEntnoDig(nEntno, nAttributes, nDir)
 * @param {Number} nEntno - nEntno
 * @param {Number} nAttributes - nAttributes
 * @param {Number} nDir - nDir
 */
function AddDigInfoEntnoDig(nEntno, nAttributes, nDir){
}

/**
 * AddDigInfoEntNameDig(strEntName, nAttributes, nDir)
 * @param {String} strEntName - strEntName
 * @param {Number} nAttributes - nAttributes
 * @param {Number} nDir - nDir
 */
function AddDigInfoEntNameDig(strEntName, nAttributes, nDir){
}

/**
 * AddDigInfoCoordStr(nSnap, strCoordStr)
 * @param {Number} nSnap - nSnap
 * @param {String} strCoordStr - strCoordStr
 */
function AddDigInfoCoordStr(nSnap, strCoordStr){
}

/**
 * AddDigInfoLocation(nSnap, rXLocation, rYLocation, rZLocation)
 * @param {Number} nSnap - nSnap
 * @param {Number} rXLocation - rXLocation
 * @param {Number} rYLocation - rYLocation
 * @param {Number} rZLocation - rZLocation
 */
function AddDigInfoLocation(nSnap, rXLocation, rYLocation, rZLocation){
}

/**
 * AddDigInfoWorld(rXLocation, rYLocation, rZLocation)
 * @param {Number} rXLocation - rXLocation
 * @param {Number} rYLocation - rYLocation
 * @param {Number} rZLocation - rZLocation
 */
function AddDigInfoWorld(rXLocation, rYLocation, rZLocation){
}

/**
 * AddDigInfoView(rXLocation, rYLocation)
 * @param {Number} rXLocation - rXLocation
 * @param {Number} rYLocation - rYLocation
 */
function AddDigInfoView(rXLocation, rYLocation){
}

/**
 * AddDigInfoScreen(rXLocation, rYLocation)
 * @param {Number} rXLocation - rXLocation
 * @param {Number} rYLocation - rYLocation
 */
function AddDigInfoScreen(rXLocation, rYLocation){
}

/**
 * AddDigInfoUVSurf( rUParameter, rVParameter)
 * @param {Number} rUParameter - rUParameter
 * @param {Number} rVParameter - rVParameter
 */
function AddDigInfoUVSurf( rUParameter, rVParameter){
}

/**
 * AddDigInfoPortNumber(nPortNumber)
 * @param {Number} nPortNumber - nPortNumber
 */
function AddDigInfoPortNumber(nPortNumber){
}

/**
 * AddDigInfoElement(nElementNumber, nDirection)
 * @param {Number} nElementNumber - nElementNumber
 * @param {Number} nDirection - nDirection
 */
function AddDigInfoElement(nElementNumber, nDirection){
}

/**
 * AddDigInfoConstructRef(nType, nInfos)
 * @param {Number} nType - nType
 * @param {Number} nInfos - nInfos
 */
function AddDigInfoConstructRef(nType, nInfos){
}

/**
 * AddDigInfoComponentInfo(nAttributes, nType, nCmds)
 * @param {Number} nAttributes - nAttributes
 * @param {Number} nType - nType
 * @param {Number} nCmds - nCmds
 */
function AddDigInfoComponentInfo(nAttributes, nType, nCmds){
}

/**
 * AddDigInfoTopology(nKIID)
 * @param {Number} nKIID - nKIID
 */
function AddDigInfoTopology(nKIID){
}

/**
 * Reads the license code from CLS and returns TRUE if the license is available
 * @param {Number} nLicenseCode - Integer license code: contact your Reseller for the current set of license codes
 * @returns {Boolean} 
 */
function IsLicensed(nLicenseCode){
}

/**
 * runs a command formatted as a JSON string
 * @param {String} strJSON - 	///	string containg a JSON object (see JSON.stringify)
 */
function ExecuteCommandJSON(strJSON){
}

/**
 * Creates a dialog from the Noun defined in strXMLFilepath
 * @param {String} strXMLFilepath - 	///	path to XML file
 * @returns {Handle} 
 */
function CreateDialog(strXMLFilepath){
}

/**
 * Display the dialog
 * @param {Handle} hCmd - 	///	Handle to the dialog
 * @returns {Boolean} 
 */
function ShowDialog(hDlg){
}

/**
 * Get the modifier state bit flags
 * @param {Handle} hCmd - 	///	Handle to the dialog
 * @param {Number} nModifier - 	///	Modifier id
 * @returns {Number} 
 * @param {Number} nState - 	///	Modifier id
 * @returns {Boolean} 
 */
function GetModifierState(hDlg, nModifier, nState){
}

/**
 * Set the modifier state bit flags
 * @param {Handle} hCmd - 	///	Handle to the dialog
 * @param {Number} nModifier - 	///	Modifier id
 * @param {Number} nState - 	///	Modifier id
 * @param {Boolean} bSet - 	///	set or not set
 */
function SetModifierState(hDlg, nModifier, nState, bSet){
}

/**
 * Set modifier list options
 * @param {Handle} hCmd - 	///	Handle to the dialog
 * @param {Number} nModifier - 	///	Modifier id
 * @param {String} strOptions - 	///	The list options separated by ^
 */
function SetOptions(hDlg, nModifier, strOptions){
}

/**
 * Set the modifier callback function
 * @param {Handle} hCmd - 	///	Handle to the dialog
 * @param {Number} nModifier - 	///	Modifier id
 * @param {String} strFunctionName - 	///	The function name
 */
function SetDialogCallback(hDlg, nModifier, strFunctionName){
}

/**
 * Free the dialog
 * @param {Handle} hCmd - 	///	Handle to the dialog
 */
function FreeDialog(hDlg){
}

/**
 * Read a string from Edgecam's registry
 * @param {Number} nCFGRec - 	///	constant vlaue: e.g. _TEMP_LOCATION_CFG_REC, _NETWORK_LOCATION_CFG_REC, etc.
 * @returns {String} 
 */
function GetRegistryString(nCFGRec){
}

/**
 * Ends a command's transaction. 
 * @param {Number} nCommandReturnValue - 	///	the return value from ExecCommand. If the value is _ABORT the command's actions will be undone.
 */
function EndCommand(nCommandReturnValue){
}

/**
 * Frees all storage associated with a previously initialised command.
 * @param {Number} handleCmd - 	///	the handle of the command to be freed.
 */
function FreeCommand(handleCmd){
}

/**
 * Frees all storage associated with a previously initialised command.
 */
function GetEntityData(Entno, KIID, flags, dataSet){
}

/**
 * Frees all storage associated with a previously initialised command.
 */
function FindEntityNo(start, etype, instance, flags) {
}

/**
 * Frees all storage associated with a previously initialised command.
 */
function AddFinishDig(hDig, nDig) {
}

/**
 * Frees all storage associated with a previously initialised command.
 */
function SaveWithPart(varArray) {
}

/**
 * Frees all storage associated with a previously initialised command.
 */
function AddToolFilterToOperation(nOpId, nFilter) {
}

/**
 * Frees all storage associated with a previously initialised command.
 */
function ErrorLevel(nEnable) {
}


