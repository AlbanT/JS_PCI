/**
 * NOTE ListFiles()
 * @param {text} folder folder to search for files to list
 * @param {text} extension optional file extension to filter on. Undefined returns all file extensions
 * @param {boolean} debug set to true to print the return JS object to the feedback as JSON
 * @returns {object} js object containing file information of the found files
 */
function ListFiles(folder, extension, debug) {
    // JS object to store the output data into
    var result = {
        length: 0, // nr of found files
        file: [] // array containing the filenames
    }

    // start a new FileSystemObject
    var fso, f, fc;
    fso = new ActiveXObject("Scripting.FileSystemObject");

    // collect all contents of the folder
    f = fso.GetFolder(folder);

    // list all found files
    fc = new Enumerator(f.files);

    // loop thru the list with found files
    var counter = 0;
    for (; !fc.atEnd(); fc.moveNext())
    {
        // extract the extension to filter the files on
        var strExtension = fso.GetExtensionName(fc.item());

        if (extension != undefined && (strExtension.toLowerCase() == extension.toLowerCase()) || extension == undefined) {

            // extract file attributes
            var afile = fso.GetFile(fso.GetAbsolutePathName(fc.item()));

            // add file to the JS object
            result.file[counter] = {
                filename: fso.GetFileName(fc.item()), // filename without folder
                folder: folder, // only the file folder
                extension: strExtension, // only the file extension
                basename: fso.GetBaseName(fc.item()), // filename without extension and folder
                filepath: fso.GetAbsolutePathName(fc.item()), // full filename including folder and extension
                attribute: [{
                    size_in_byte: afile.Size,
                    date_last_modified: String(afile.DateLastModified),
                    date_created: String(afile.DateCreated),
                    date_last_accessed: String(afile.DateLastAccessed),
                    type: afile.Type
                }]
            };
            counter++;
        }
    }
    // Add the number of found files to the JS object
    result.length = counter;

    if (debug) {
        // convert the JS object to JSON and print to feedback window
        Display(JSON.stringify(result, null, 4) + "\n");
    }

    // Output the JS object
    return result;
}