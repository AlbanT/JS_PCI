function CreateShortcut(name, location, target) {
    /* https://lpetr.org/2007/08/14/creating-start-menu-shortcuts-with-javascript/ */

    var WshShell = new ActiveXObject("WScript.Shell");

    var shortcut = WshShell.CreateShortcut(location + "\\" + name + ".lnk");
    shortcut.TargetPath = target;
    shortcut.WorkingDirectory = target;
    shortcut.Save();

}