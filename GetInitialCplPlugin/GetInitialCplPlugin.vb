Imports Edgecam
Imports EdgecamPluginFramework   '<ECINSTALLDIR>\cam\EdgecamPluginInterface.dll
Imports PDINet                   '<ECINSTALLDIR>\cam\PDINet.dll

' use "<ECINSTALLDIR>\cam\Examples\Plugins\PCIPlugin VB" as base for this plugin.

' this class provides the necessary implementation 
Public Class GetInitialCplPlugin
    Inherits EdgecamPlugin

    Public Overrides ReadOnly Property Name As String
        Get
            Name = "GetInitialCplPlugin" ' this appears in the Execute Plugin command
        End Get
    End Property

    Public Overrides Function Start() As Boolean

        ' set ANSI C style decimal separator without altering the thread's codepage
        Dim current As System.Globalization.CultureInfo
        current = System.Globalization.CultureInfo.CurrentCulture.Clone()
        current.NumberFormat.NumberDecimalSeparator = "."
        System.Threading.Thread.CurrentThread.CurrentCulture = current

        Dim pci As New PCI
        With pci
            ' retrieve the machining sequence info
            Dim turret As New PDINet.turret_info
            PDINet.PDI.MC_Get_Turret(PDINet.Turret.UPPER, turret)

            ' objects needed for interogating the entities
            Dim test_ehead As New PDINet.ehead
            Dim test_cpl_ent As New PDINet.cpl_ent

            ' determine the amount of entities that are present
            Dim nLimit = PDINet.PDI.Get_Num_Ents(0)

            For j = 1 To nLimit
                ' extract the header info
                PDINet.PDI.Get_Header(j, test_ehead)

                ' check to see if the current entity is a CPL and if it is the initial CPL
                If (test_ehead.etype = Entities.CPL And test_ehead.matent + 1 = turret.initial_cpl) Then
                    ' Get information about CPL entity in database. 
                    PDINet.PDI.Get_CPL(test_ehead, test_cpl_ent)

                    ' use pci command to store the name of the initial cpl in [$InitialCPL]
                    pci.SetPCIVariable("$InitialCPL", test_cpl_ent.name)

                    ' store the pci variable in the ppf file rather than the EDGECAM instance
                    pci.SaveWithPart(New String() {"$InitialCPL"})

                    ' jump out of the loop because we don't need to interogate the rest of the entities 
                    Exit For
                End If
            Next
        End With

        Return True

    End Function
End Class
