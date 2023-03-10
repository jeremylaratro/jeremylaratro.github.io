
### **Overview, Tools, and Pathways**

>These are a few of the plethora of tools out there. These are ones in which I have used at some point.



### General Enumeration | Scanning | Reconnaissance


>>#### whatweb
>- This is often the first tool used when given a domain, to determine basic info about the web server (in cases where a domain is the given target) and to obtain the IP address.
>>####  Nmap
>- Among the most commonly used tools, nmap allows one to scan the target machine and gain a great deal of information about it, including open ports, services, and even vulnerability assessment via
>- scripts.
>>#### rustscan
>- Extremely fast alternative to nmap. Does not provide the depth of information but scans the entire port range in a fraction of the time.
>>####  wpscan
>- If a wordpress site is identified, wpscan is extremely useful in finding potential vulnerabilities by enumerating plugins along with various other powerful features including bruteforce attacks if xmlrpc is enabled.
>>####  Nessus
>- Nessus is an all-around vulnerability scanner and can help identify potential vulnerabilities and avenues of attack
>>####  OWASP Zap
>- OWASP Zap is a GUI-based scanning tool that is focused on the OWASP top 10 vulnerabilities. This is another tool that can be useful in determining potential vulnerabilities.
>>####  Dig, dnsenum, and nslookup
>- These tools, along with various others, are useful in automating the process of DNS queries and can be extremely useful in reconnaissance of a website and in understanding the ownership and relationship between domain names and IPs.</details>
>>####  Shodan
> - Extremely powerful passive recon engine.



-----------


### **Web and Network Exploitation**

There are thousands and thousands of different tools, scripts, and applications out there for all the various different attack types and vulnerabilities. The following are ones which I have personally used in labs and challenges and which I am at least fairly comfortable using.

>>### Enumeration && Exploitation Tools  
> 
>>####  BURP Suite
> - Powerful proxy -> intercept and modify requests, leading to a large variety of potential uses
>>####  dirb, dirbuster, gobuster
> - Directory enumeration
>>#### gospider
> - Spider/crawler written in go.
>>####  ffuf, hydra
> - Web fuzzing, directory enumeration, account brute forcing
>>####  sstimap, lfimap
> - LFI and SSTI vulnerability scanner and exploitation tool
>>####  LinPEAS, WinPEAS
> - Extremely comprehensive PrivEsc scripts
>>####  curl, wget
> - Linux commands, useful for RCE and file transfer
>>####  enum4linux, smbmap, smbscan
> - SMB enumeration scripts
>>####  lftp
> - Useful tool for transferring files to and from ftp
>>####  revshells.com
> - Convenient website to create simple reverse shell payloads
> - ---
>>### Automated Exploitation Tools
> 
>>####  Metasploit
> - Massive collection of known exploits, scripts, payloads, and database
>>####  SQLMap
> - SQLi scanner and exploitation tool
>>####  xsssniper
> - XSS scanner and exploitation tool. I rarely use this is favor or manual XSS exploitation, but is sometimes handy to have when nothing else works.
>>####  rapidscan
> -    Tool which essentially creates a suite of other popular exploitation tools like sqlmap, dirb, etc.
>>>#### Responder 
> - Capture authentication hashes
>>>#### impacket suite  
> psexec, wmiexec, smbserver, etc.
>>>#### bloodhound/sharphound
> - Domain discovery   

----------



### **Investigative, Post-Exploitation Tools**

>>####  hashcat
> - GUI-accelerated password cracking tool. Extremely quick.
>>####  John the Ripper and john2__
> - Another password cracking tool, particularly useful for it's auto-detection and john2'other' conversion scripts.
>>####  cewl, crunch
> - Custom password and wordlist generators
>>####  binwalk, exiftools
> - Linux file analysis tools
>>####  PhotoSecUtils
> - My personal file analysis tool for analyzing jpegs

----------
