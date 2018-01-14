#####################################################################################
# This powershell script force deletes all packages from the following paths:
#
#  1. C:\<user>\.nuget\packages\
#  2. C:\PrjNET\<project>\Mainline\_Packages\
#  3. C:\PrjNET\<project>\Mainline\_localPackages\
#####################################################################################
param([String[]] $paths)

Add-Type -AssemblyName Microsoft.VisualBasic

# Replace with the project folder name.
# $projectName = "Krugman"

# # $path_user_profile = $env:userprofile+"\.nuget\packages"
# # $path_packages_project = "C:\PrjNET\"+$projectName+"\Mainline\_Packages"
# # $path_local_packages_project = "C:\PrjNET\"+$projectName+"\Mainline\_localPackages"

# ------------------------------------------------------------------
# FUNCTION - REMOVE DIRECTORY CONTENTS
# ------------------------------------------------------------------

function remove-directory-contents($path) {   

    Write-Host "Removing files from... "
    Write-Host $path
    Write-Host "------"
    if(Test-Path $path)
    {
        Write-Host "Path Exists..."
        try
        {
            # Delete packages from
                
            $message = $path
            #Write-Host -NoNewline $message
        
            $path_delete_all_files = $path + "\*"
            
            ##Write-Host $path_delete_all_files
            Remove-Item $path_delete_all_files -Recurse -Force
            
            Write-Host "Deleted OK!"
        }
        catch
        {
            $ErrorMessage = $_.Exception.Message
            return $ErrorMessage
            #Write-Host $ErrorMessage
        }
    }
    else
    {
        $message = "[ERROR] - Folder does not exist: " + $path
        return $message
    }

    ##return $message
}

function Remove-Item-ToRecycleBin($Path) {
    $item = Get-Item -Path $Path -ErrorAction SilentlyContinue
    if ($item -eq $null)
    {
        Write-Error("'{0}' not found" -f $Path)
    }
    else
    {
        $fullpath=$item.FullName
        Write-Verbose ("Moving '{0}' to the Recycle Bin" -f $fullpath)
        if (Test-Path -Path $fullpath -PathType Container)
        {
            [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory($fullpath,'OnlyErrorDialogs','SendToRecycleBin')
        }
        else
        {
            [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile($fullpath,'OnlyErrorDialogs','SendToRecycleBin')
        }
    }
}

# ------------------------------------------------------------------
# PACKAGES - CACHE DIRECTORY
# ------------------------------------------------------------------
if ($paths -eq $null)
{
    Write-Output "No paths given"
}
else
{
    foreach ($p in $paths)
    {
        ##Remove-Item-ToRecycleBin($p)
        remove-directory-contents $p
    }

}

exit

# ------------------------------------------------------------------
# PACKAGES - PROJECT DIRECTORY
# ------------------------------------------------------------------

##remove-directory-contents $path_packages_project

# ------------------------------------------------------------------
# LOCAL PACKAGES - PROJECT DIRECTORY
# ------------------------------------------------------------------

##remove-directory-contents $path_local_packages_project