var hOp = InitOperation("Operation name", "", 0);
	AddUserModToOperation(hOp,"Var1","Normal field","Tab1^",0, "");
	AddUserModToOperation(hOp,"_List_Var","Listîtem1îtem2^","Tab1^Divider1",0, "");
	AddUserModToOperation(hOp,"_Check_Var","Checkbox","Tab1^Divider2",0, "");
	AddUserModToOperation(hOp,"m_INT_Var","Integer","Tab1^Divider2",0, "");
	AddUserModToOperation(hOp,"_REAL_Var","Real","Tab1^Divider2",0, "");
	AddUserModToOperation(hOp,"$_TEXT_Var","Single text line","Tab1^Divider2",0, "Hello World");
	AddUserModToOperation(hOp,"$_MTEXT_Var","Multi text line","Tab1^Divider2",0, "");
	AddUserModToOperation(hOp,"_Radio_Var","Radio buttonîtem1îtem2^","Tab1^Divider2",0, "");
	AddUserModToOperation(hOp,"Var2","Normal field 2","Tab2",0, "");
var nOpRet = DoOperationMods(hOp);
FreeOperation(hOp);

CommitOperation(hOp,hDigArray);