#   Cybersecurity: Notes and Projects - Main Overview

----

[Back to website home page](https://jeremylaratro.link)

----
> This page is essentially the directory for all of my CS-related posts, notes, writeups, etc.

## OSCP
At this time, I am officially working on my OSCP course. I will not able to share 
many of my notes and writeups due to course policy, however, I will still post any notes and writeups
that I am able to do from THM, HTB, etc., but my main focus for the next two months will be on the OSCP content  

---

> ### **My latest posts:**
### [AD: Exploitation Overview](https://jeremylaratro.link/CS/notes/ad_exploitation)
### [AD: File Transfer](https://jeremylaratro.link/CS/notes/ad_filetransfer)
### [THM: Daily Bugle](https://jeremylaratro.link/CS/thm_dailybugle)
### [THM: Wonderland](https://jeremylaratro.link/CS/CTF/wonderland_thm)
### [THM: Pickle Rick](https://jeremylaratro.link/CS/CTF/thm_pickle_rick)
### [Linux Privilege Escalation Notes](https://jeremylaratro.link/CS/notes/PrivEsc)



-----------
>## Index - Pages and Notes:
>
>---
>>### Notes:
>#### [Linux Privilege Escalation Notes](https://jeremylaratro.link/CS/notes/PrivEsc)
>####  [GoLang -- Notes](https://jeremylaratro.link/CS/notes/golang)
>#### [Active Directory Notes](https://jeremylaratro.link/CS/notes/active_directory)
>#### [SMB Exploitation -- Notes](https://jeremylaratro.link/CS/notes/smb)
>#### [Defensive Security Notes](https://jeremylaratro.link/CS/notes/defensive_sec)
>#### [LFI/RFI Notes](https://jeremylaratro.link/CS/notes/lfi)
>#### [SSTI Notes](https://jeremylaratro.link/CS/notes/ssti)
>#### [XSS Notes](https://jeremylaratro.link/CS/notes/xss)
>
>
>---
>>### CTF Notes and Writeups:
>#### [OWASP Juice Shop -- Notes and Walkthrough](https://jeremylaratro.link/CS/CTF/juice_shop)
>#### [hackerone -- Notes and Walkthrough](https://jeremylaratro.link/CS/CTF/hacker_one_ctf)
>#### [THM: Pickle Rick](https://jeremylaratro.link/CS/CTF/thm_pickle_rick.md)
>#### [THM: rootme writeup](https://jeremylaratro.link/CS/CTF/thm_rootme)
>#### [THM: Wonderland](https://jeremylaratro.link/CS/CTF/wonderland_thm)
>#### [THM: Chill Hack](https://jeremylaratro.link/CS/CTF/thm_chill_hack)
>#### [THM: Chocolate Factory](https://jeremylaratro.link/CS/CTF/chocolate_factory)
>#### [THM: Brooklyn Nine Nine](https://jeremylaratro.link/CS/CTF/brooklyn_nine_nine)
>#### [THM: Anonymous](https://jeremylaratro.link/CS/CTF/thm_anonymous)



----


### **Resources: My Reading List & Accounts**

* Linux Basics for Hackers Getting Started with Networking, Scripting, and Security in Kali (OccupyTheWeb)
* Penetration Testing A Hands-On Introduction to Hacking (Weidman, Georgia)
* Becoming A Master Hacker (OccupyTheWeb)
* Competitive Programming in Python 128 Algorithms to Develop your Coding Skills (Christoph Dürr, Jill-Jênn Vie)
* Real-World Bug Hunting A Field Guide to Web Hacking (Peter Yaworski)
* [Codecademy Profile](https://www.codecademy.com/profiles/JeremyLaratro)
* [TryHackme.com Profile (In the top 4% of users!)](https://tryhackme.com/p/jeremylaratro)
* HackTheBox.com 
* Hacktricks.xyz
* [Picoctf.org Profile](https://play.picoctf.org/users/jeremylaratro)
* [LeetCode Profile](https://leetcode.com/jeremylaratro/)
* Youtube & Personal Sites/Courses -- LiveOverflow, John Hammond, Loi Liang Yang, David Bombal, Hackersploit, freeCodeCamp.org, and many more.
----


----------


### **Overview, Tools, and Pathways**

>These are a few of the many tools in which I am familiar with. These tools generally fall into the enumeration,
> reconnaissance and vulnerability assessment steps.

> 
>While these tools can be great for speeding up processes, I always prefer to do manual exploitation, especially 
> in topics in which I am less confident about, as that is the only way to learn the process.


## General Enumeration | Scanning | Reconnaissance


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
> - Extremely powerful passive recon engine.



-----------


### **Web and Network Exploitation**

There are thousands and thousands of different tools, scripts, and applications out there for all the various different attack types and vulnerabilities. The following are ones which I have personally used in labs and challenges and which I am at least fairly comfortable using.

>>### Manual Exploitation Tools  
> 
>>####  BURP Suite
> - Powerful proxy -> intercept and modify requests, leading to a large variety of potential uses
>>####  dirb, dirbuster, gobuster
> - Directory enumeration
>>####  ffuf, hydra
> - Web fuzzing, directory enumeration, account brute forcing
>>####  sstimap, lfimap
> - LFI and SSTI vulnerability scanner and exploitation tool
>>####  LinPEAS, WinPEAS
> - Extremely comprehensive PrivEsc scripts
>>####  curl, wget
> - Linux commands, useful for RCE and file transfer
>>####  linenum, smbscan
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
> - Tool which essentially creates a suite of other popular exploitation tools like sqlmap, dirb, etc.


----------


### **Investigative, Post-Exploitation Tools**

>>####  hashcat
> - GUI-accelerated password cracking tool. Extremely quick.
>>####  John the Ripper and john2__
> - Another password cracking tool, particularly useful for it's auto-detection and john2'other' conversion scripts.
>>####  cewl, crunch
> - Custom password and wordlist generators
>>####  binwalk, exiftools, strings, cat, file
> - Linux file analysis tools
>>####  PhotoSecUtils
> - My personal file analysis tool for analyzing jpegs

----------

### **Areas I'd Like to Improve**
- Windows Exploitation -- Active Directory for OSCP
- Advanced, manual SQLi
- Advanced, manual XSS

----------
