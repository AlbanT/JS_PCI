/// <reference path="C:\Program Files\Hexagon\EDGECAM 2024.1\cam\PCI\pci-vsdoc.js" />

// object containing ppf related data
var ppf_object = {
    filename: "x:\\test.ppf",
    nc_generation: {
        nc_file: "x:\\test.min",
        run_after: ""
    }
};

// object containing all tombstone related data
var tombstone_object = {
    tombstone: {
        file: "X:\\tombstone_template.ppf"
    },
    seeds: [
        {
            sequence: "merged",
            mate_cpl: "PartMate",
            target_cpl: "000.1",
            datum_order: 1,
            file: "X:\\seedfile_a.ppf",
            copy: false
        },
        {
            sequence: "merged",
            mate_cpl: "PartMate",
            target_cpl: "120.2",
            datum_order: 2,
            file: "X:\\seedfile_b.ppf",
            copy: false
        }
    ],
    settings: {
        fixture_clearance_options: {
            planar_moves: {
                offset: 0,
                z_offset: 0,
                xy_offset: 0
            },
            index_moves: {
                offset: 0,
                absolute_radius: 999
            },
            move_before_index: {
                type: 0 /* 0 None, 1 Home , 2 Toolchange */,
                fixed: {
                    x: false,
                    y: false,
                    z: false
                }
            }
        },
        ordering: {
            type: 1 /* 0  None,1 By Tool then by Plane,2 By Plane then by Tool,3 By Tool Only - Keep sequence order,4 By Plane Only - Keep sequence order	 */
        },
        output_options: {
            type: 1 /* //1 for Absolute, 2 for Incremental from Parent */,
            use_subroutines: false
        }
    }
};

generate_tombstone(tombstone_object, ppf_object);

function generate_tombstone(ts, ppf) {
	if (Number(getPCIVariable("&VERSION").substr(0,4)) < 2024) {
		alert("This PCI needs EDGECAM 2024.1 or higher!");
		return;
	}	
	
    // check if the file is empty, if not start a new one.
    if (GetPCINumber("&NUMBEROFSOLIDS") > 0) {
        // Initialising command:- New File
        var cmd1 = InitCommand(9, 0);
        ClearMods(cmd1);
        // Setting modifier 'Force Restart'
        SetModifier(cmd1, 339, "<Yes>");
        ExecCommand(cmd1, -1);
    }

    // load the tombstone
    AddTombStone(ts.tombstone.file);

    // load the individual seed files onto the tombstone
    for (s in ts.seeds) {
        AddTombStoneComponent(
            ts.seeds[s].file,
            ts.seeds[s].sequence,
            ts.seeds[s].mate_cpl,
            ts.seeds[s].target_cpl,
            ts.seeds[s].datum_order,
            ts.seeds[s].copy
        );
    }

    // specify the settings used for the tombstone generation
    AddTombStoneModifiers(
        ts.settings.fixture_clearance_options.planar_moves.offset,
        ts.settings.fixture_clearance_options.planar_moves.z_offset,
        ts.settings.fixture_clearance_options.planar_moves.xy_offset,
        ts.settings.fixture_clearance_options.index_moves.offset,
        ts.settings.fixture_clearance_options.index_moves.absolute_radius,
        ts.settings.fixture_clearance_options.move_before_index.type,
        ts.settings.fixture_clearance_options.move_before_index.fixed.x,
        ts.settings.fixture_clearance_options.move_before_index.fixed.y,
        ts.settings.fixture_clearance_options.move_before_index.fixed.z,
        ts.settings.ordering.type,
        ts.settings.output_options.type,
        ts.settings.output_options.use_subroutines
    );

    // start the tombstone generation
    ApplyTombStone();

    // generate nc-code
    var cmd1 = InitCommand(19, 666);
    ClearMods(cmd1);
    SetModifier(cmd1, 14, ppf.code_generation.nc_file);
    SetModifier(cmd1, 251, "<Yes>");
    if (ppf.run_after != "") {
        SetModifier(cmd1, 45, ppf.run_after);
    }
    ExecCommand(cmd1, -1);

    // save the ppf-file
    var cmd1 = InitCommand(19, 3);
    ClearMods(cmd1);
    SetModifier(cmd1, 14, ppf.filename);
    ExecCommand(cmd1, -1);
}
