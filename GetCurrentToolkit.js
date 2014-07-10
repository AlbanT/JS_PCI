function CurrentToolkit() {
	var cmd1 = InitCommand(16, 62);
	GetModifier(cmd1, 249, "$CurrentToolkit");
	FreeCommand(cmd1);

	return GetPCIVariable("$CurrentToolkit");
}