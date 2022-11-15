RootMe: TryHackMe Basic Linux Privilege Escalation
-------

[Back to Table of Contents](../cysec)

In this THM machine, the attacker must enumerate the domain and perform reconaiisance, use a webshell via poorly secured web form, and then escalate privilege from user to root. 

First, an enumeration of the domain is performed using dirb or gobuster and nmap or rustmap. 
Nmap returns two results, port 22 with SSH and an Apache server running on port 80, along with the Apache version. 

Dirb yields two interesting results:
 - /panel
 - /uploads
 
The webpage at /panel appears to be a form, with an upload button. We previously learned that this site us running using Apache, and thus we can attempt to upload a PHP webshell. 

First, I tried to upload the PHP webshell but found that the server is performing at least some filtering of the file extensions, so I first tried simply adding a URL encoded nullbyte, which didn't work. I then tried saving the webshell as '.phtml', which succesfully uploaded.

I started the netcat listener at the port I set for the webshell and proceeded to call the file via the uploads directory I found earlier. This was succesful and I was granted low-level, user access via netcat. 

The THM objective at this point was to find the flag contained in a text file called "user.txt" and to do this I tried:
```
locate user.txt
```
However, this did not work so I used the find command instead:
```
find . -type f -iname 'user.txt'
```

The last objective was to obtain root via privilege escalation. 

In this case, we will use misconfigured SUID permission to escalate user privilege to root. 

The first step in doing this was to find scripts/binaries that have the s bit that may be vulnerable. This can be done using something along the lines of: 

```
find / -user root -perm /4000
```
or 
```
find . -perm /4000
```
 - 4000 is the permission flag for SUID

This search returned many results, but included one peculiar binary, 'python.'

Using GTFOBins, I searched python and found that there is indeed a SUID privilege escalation attack possible. I moved to the directory containing the python binary and then executed the privesc command from GTFOBins. 


```
cd /usr/bin/

./python -c 'import os; os.execl("/bin/sh", "sh", "-p")'

whoami
```

After running this command, I ran whoami and found that the escalation was succesful and I now had root access. The last step was to find the root flag, which was done using the same method earlier for the user flag:

```
cd ..

find . -iname 'root.txt'
```
