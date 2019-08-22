/// <reference path="c:\program files\vero software\edgecam 2017 r1\cam\PCI\pci-vsdoc.js" />

function NewLayer(LayerName){
    /// <summary>
    /// Creates a new layer
    /// </summary>
    /// <param name="LayerName" type="string">name of the new layer</param>

	// Initialising command:- New Layer
	cmd1 = InitCommand(50, 135);
	ClearMods(cmd1);
	// Setting modifier 'Name'
	SetModifier(cmd1, 51, LayerName);
	// Setting modifier 'Visible'
	SetModifier(cmd1, 42, "<Yes>");
	cmdret=ExecCommand(cmd1, -1);
}

function RenameLayer(LayerName,NewLayerName){
    /// <summary>
    /// Rename a layer (New in 2017R1)
    /// </summary>
    /// <param name="LayerName" type="string">Old name of the layer</param>
    /// <param name="NewLayerName" type="string">New name of the layer</param>

	// Rename Layer
	cmd1 = InitCommand(50,722);
	// Select the Layer
	SetModifier(cmd1, 3, LayerName);
	// Select the new name
	SetModifier(cmd1, 14, NewLayerName);
	ExecCommand(cmd1, -1);
}

function ActivateLayer(LayerName) {
    /// <summary>
    /// Activate a layer (new in 2017R1)
    /// </summary>
    /// <param name="LayerName" type="string">Name of the layer</param>

	// Activate Layer
	cmd1 = InitCommand(50,723);
	// Select the Layer
	SetModifier(cmd1, 3, LayerName);
	ExecCommand(cmd1, -1);
}

function ShowHideLayer(LayerName, Visible) {
    /// <summary>
    /// Make a layer visible or invisible
    /// </summary>
    /// <param name="LayerName" type="string">Name of the layer</param>
    /// <param name="Visible" type="boolean">true=1=visible and false=0=hide</param>

	// Set Layer Visibility
	cmd1 = InitCommand(50,724);
	// Select the Layer
	SetModifier(cmd1, 3, LayerName);
	// Show = 1, Hide = 0;
	SetModifier(cmd1, 42, Visible);
	ExecCommand(cmd1, -1);
}

function DeleteLayer(LayerName) {
    /// <summary>
    /// Delete a layer
    /// </summary>
    /// <param name="LayerName" type="string">Name of the layer</param>

	// Initialising command:- Verwijder Lagen
	var cmd1 = InitCommand(50, 136); 
	ClearMods(cmd1); 
	// Setting modifier 'Naam'
	SetModifier(cmd1, 51, LayerName); 
	var cmdret = ExecCommand(cmd1, -1); 
}



