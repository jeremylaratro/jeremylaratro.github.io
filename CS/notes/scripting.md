## Scripting for pentesting, offensive applications, and general efficiency

-----

If there was one thing that OSCP drills into above all else, it is the importance of enumeration. 
This further translates into the importance of balancing thorough enumeration with efficiency as time is
certainly a limiting factor when you have 24 hours to take over an entire active directory domain and 3 separate systems. 
This project was a way for me to gain some hands-on knowledge of using bash in a practical application while also 
furthering my enumeration efficiency in the course.
 
It is important to note that this script is tailored for the OSCP specifically and is extremely "loud" so may not be suitable for certain scenarios. With that said,
these principles can be applied to craft a specialized script for your needs. I am also fairly new to bash scripting, having mostly used it within the context
of the terminal in the past rather than full-blown scripts so experienced bash devs probably have a lot to teach me. 

The main enumeration script can be found in the following repo:
https://github.com/jeremylaratro/pentest_scripts/blob/main/start.sh

As an avid linux user, I strongly believe that learning about and taking advantage of bash is really useful. Some things, especially 
the more complex regex stuff can get really convoluted, but the increase in efficiency when you can use even simple
commands like "cat * | grep 'Name:'" for file processing instead of having to open the files,
is certainly worth the time and effort to learn it. 

The script starts out with some basic argument checks and initializations. 
I broke the script into basic functions and instead of directly calling those functions via terminal switches, I made the choice to use an intermediate function
so that I can have easier control of any messaging options and in general. 

```bash 
#!/bin/bash

#defaults
#ip=""
#domain=""
opts='i:d:x:nlbawshvf'
while getopts $opts arg; do
  case $arg in
    i ) ip=$OPTARG;;
    d ) domain=$OPTARG;;
    l ) lfi=1;;
    s ) sub=1;;
    w ) web=1;;
    n ) nmap=1;;
    f ) network=1;;
    a ) all=1;;
    b ) smb=1;;
    v ) exp=1;;
    r ) form=1;;
    h ) help=1;;
    * ) echo "unknown argument";;
  esac
done
argcheck() {
  if [ ! -z $ip ]; then
    export OPT=$ip
    echo "IP selected: $OPT"
  elif [ ! -z $domain ]; then
    export OPT=$domain
    echo "Domain selected: $OPT"
  fi
}

argcheck
echo "$OPT"
```
The section just above, argcheck is a recent addition. Basically, my focus was solely on OSCP labs where I am working mostly with IP's rather
than domain names. That portion is my first step at trying to widen the scope of this script to integrate domain scanning as prior, it only really
worked as intended if given IP and domain. The next step in this modification is to pull the IP address from the whatweb results.

```
RRED="\e[31m"
RED="31"
GREEN="32"
RGREEN="\e[32"
BOLDGREEN="\e[1;${GREEN}m"
BOLDRED="\e[1;${RED}m"
ITALICRED="\e[3;${RED}m"
ENDCOLOR="\e[0m"

help() {
echo -e "
-------------------------------------------------------------------------

| This is a simple script made to streamline inital discovery and        |
| enumeration for my OSCP course.                                        |
|   ----------------------------------------------------------------     |
| ${BOLDGREEN}Usage:${ENDCOLOR}                                                                 |
|  $(basename $BASH_SOURCE) -i 10.10.x.x -n -d example.com -v -b            		 |
|  $(basename $BASH_SOURCE) -i 10.10.x.x -a                                		 |
------------------------------------------------------------------------
"
  echo "
----------------------------
| Switches:                 |
|---------------------------|
| Arg required:             |
| -i ip_addr	-d domain   |
|---------------------------|
| Options (no args - on/off)|
|  -f full network scan     |
|  -b smb scan              |	
|  -s subdomain discovery   |	
|  -v exploit check         |	
|  -w directory enumeration |
|  -l lfi scan (requires -d |
| or -a switch first        |
|  -h help                  |
|  -a all                   |						
----------------------------	
"
  echo -e "${BOLDRED}Outputs available at output/scan_$ip ${ENDCOLOR}"
  echo "
Dependencies:
-rustscan	-nmap		-smbclient	-gobuster
-httpx		-gospider	-searchsploit  	-whatweb
-dnsrecon	-sublist3r	-enum4linux

"
}
# Shows the simple usage / syntax
usage() {
  for i in seq{1..1}; do
    echo -n "W"
    sleep 0.15s
    echo -n "E"
    sleep 0.15s
    echo -n "L"
    sleep 0.15s
    echo -n "C"
    sleep 0.15s
    echo -n "O"
    sleep 0.15s
    echo -n "M"
    sleep 0.15s
    echo -n "E"
    sleep 0.15s
  done
  echo "
-------------------------------------------------------------------------

| This is a simple script made to streamline inital discovery and        |
| enumeration for my OSCP course.                                        |
|   ----------------------------------------------------------------     |
| Usage:                                                                 |
|  $(basename $BASH_SOURCE) -i 10.10.x.x -n -d example.com -v -b         |
|  $(basename $BASH_SOURCE) -i 10.10.x.x -a                              |
------------------------------------------------------------------------
"
  echo "
----------------------------
| Switches:                 |
|---------------------------|
| Arg required:             |
| -i ip_addr	-d domain   |
|---------------------------|
| Options (no args - on/off)
|  -f full network scan	
|  -b smb scan              |	
|  -s subdomain discovery   |	
|  -v exploit check         |	
|  -w directory enumeration |
|  -l lfi scan              |
|  -h help                  |
|  -a all                   |						
----------------------------	
"	
  echo -e "${RED}Outputs available at output/scan_$ip ${ENDCOLOR}"				
  echo "
Write access is required within the directory from which the script is run and root privileges necessary for nmap syn scan.										
  "  

  echo " "
}
#touch output/inital_$ip.txt
dircreate() {
    if [ -d 'output/scan_$ip' ]
  then
    echo 'Directory already exists, moving on.'
  else
    echo 'Creating output directory'
    mkdir output/scan_$ip 
  fi
touch output/scan_$ip/web_scan_$ip.txt
touch output/scan_$ip/inital_$ip.txt
touch output/scan_$ip/open.txt
touch output/scan_$ip/rports_$ip.txt
#output/scan_$ip/vulnchk_$ip.xml
web_out=output/scan_$ip/web_scan_$ip.txt
LOGFILE=output/scan_$ip/inital_$ip.txt
LOG2=output/scan_$ip/vulnchk_$ip.xml
export rports=output/scan_$ip/rports_$ip.txt
export open=output/scan_$ip/open.txt
echo " "
echo -e "${RED}Outputs available at output/scan_$ip${ENDCOLOR}"
echo " "
}
```

The script then goes on to create directories where the output results will be stored. I've been trying to incorporate some colors
and eventually would like to make the script format the data and output it into a report-ready state.
```
#what() {
#  echo "......................................"
#  echo "Grabbing banner with whatweb:"
# whatweb $ip
#  echo "......................................"
#}
rustall() {
	echo " Starting full port scan.."
	rustscan -a $ip --ulimit 5000 -g > $rports
	cat $rports | awk '/->/{print $3}' | tr -d '[]' | tr "," "\n" |tr -d "^ " > $open

	echo " ---------------------------"
	echo " "
}
nmap_run() {
  echo "......................................"
  echo -n "Starting nmap scan..."  
  #for i in seq{1..10}; do
  #  echo -n "."
  #sleep 0.15s
  #done
  
  echo " "
  echo "......................................"
  echo -e "${RGEEN}Nmap scan results:${ENDCOLOR}"
  ropen=$(cat $rports | awk '/->/{print $3}' | tr -d '[]') 
  echo 'The following ports are open: '$ropen
  sudo nmap -sS -sC -vv -sV $ip -p "$(echo $ropen)" -oX $LOG2 -oG $LOGFILE
  echo " "
  echo "......................................"
  echo " " 
  #nmap domain check
  #echo -n "Checking if domain exists..." 
  #for i in seq{1..10}; do
  #  echo -n "."
  #  sleep 0.15s
  #done
  #echo " "
  #sudo nmap $ip -p 53 -Pn -v
  echo "Nmap scan complete"
  echo " "
}
```
The first few functions are mostly centered around initial enumeration. I chose to use rustscan in this case because it can provide a
fairly thorough report on port openings within seconds, whereas nmap may take up to 30 minutes in some cases. 

I wanted to use rustscan but also retain the benefits of nmap's scripting engine and fingerprinting options, so I chose to pipe the rustscan
output into a file, and then use grep, awk, and tr to parse that output and present a set of ports for nmap to perform targeted scanning on. 
```
search_discover() {
  echo "Starting web discovery"
  #cat $LOGFILE | grep -o '[0-9]\{1,6\}/open/' | awk -F/ '{print$1}' > open.txt
  
  while read port; do
    echo -e "${BOLDGREEN}Checking for webserver on: $ip:$port ${ENDCOLOR}"
    httpx http://$ip:$port
    #whatweb http://$ip:$port
    #httpx https://$ip:$port
    if (httpx http://$ip:$port | grep -q -Eo '200 OK'); then
		echo $port >> output/scan_$ip/webserv.txt
		whatweb http://$ip:$port
	fi
  done < output/scan_$ip/open.txt
  echo ""
  echo " ----------------------------------------"
  echo "Starting web directory enumeration"
  echo ""
  while read wport; do
    echo "Starting GoSpider with:"
    echo "gospider -s http://'$ip:$wport"
    echo ' '
    gospider -s http://$ip:$wport
    echo "Starting GoBuster with:"
    echo "gobuster dir -u http://$ip:$wport --wordlist /usr/share/wordlists/SecLists-master/Discovery/Web-Content/raft-medium-directories.txt -x php,txt,js,html -o $web_out"
    echo ' '
    gobuster dir -u http://$ip:$wport --wordlist /usr/share/wordlists/SecLists-master/Discovery/Web-Content/raft-medium-directories.txt -x php,txt,js,html -o $web_out
    echo "Web server scanning complete" -v
    echo " "
  done < output/scan_$ip/webserv.txt
}


web_server_d() {
  echo ""
  echo " ----------------------------------------"
  echo "Starting web directory enumeration"
  echo ""
  #while read wport; do
  echo "Starting GoSpider with:"
  echo "gospider -s http://'$OPT:$wport"
  echo ' '
  gospider -s http://$OPT:$wport
  echo "Starting GoBuster with:"
  echo "gobuster dir -u http://$OPT:$wport --wordlist /usr/share/wordlists/SecLists-master/Discovery/Web-Content/raft-medium-directories.txt -x php,txt,js,html -o" $web_out
  echo ' '
  gobuster dir -u http://$OPT:$wport --wordlist /usr/share/dirb/wordlists/big.txt -x php,txt,js,html 
  echo "Web server scanning complete" -v
  echo " "
  #done < output/scan_$ip/webserv.txt
}
```
The next couple functions are focused on web discovery, and include directory bruteforcing, basic spidering, and domain discovery of the open ports. 
```
searchspl() (
  echo -n "Checking for known exploits..."
  for i in seq{1..10}; do
    echo -n "."
    sleep 0.15s
  done
  echo " "
  #whatweb $ip > ww_$ip.txt
  #searchsploit --nmap vulnchk_$ip.xml 
  #cat ww_$ip.txt | grep -Po 'PHP/\d.\d.' | tr '/' ' ' | xargs -i searchsploit -t {} | grep php
  #cat ww_$ip.txt | grep -Po 'Apache/\d.\d.' | tr '/' ' ' | xargs -i searchsploit -t {} | grep apache
  #rm ww_$ip.txt


  ssh_() {
    if (cat $LOG2 | grep -q 'ssh'); then
      rm srch.txt
      touch srch.txt
      cat $LOG2 | grep 'ssh' | grep -o 'product=".*"' | cut -d \" -f2 | grep -o '^\S*'  > srch.txt
      cat $LOG2 | grep 'ssh' | grep -oE 'version="[0-9]?.[0-9]?.' | grep -Eo '[0-9]?.[0.9]..' >> srch.txt
      vv=$(cat srch.txt)
      if [ ! -z srch.txt ]; then
        echo 'Searching exploitdb for' $vv
        searchsploit $vv
        # echo 'Analyzing ssh vulnerabilities'
        # nmap $ip --script=ssh-\* -v
        echo ' '
        
      else
        echo ' '
      fi
    else
      echo ' '
    fi
  }
  ssh_
  
  ftp_() {
    if (cat $LOG2 | grep -q 'ftp'); then
  	rm srch.txt
  	touch srch.txt
  	cat $LOG2 | grep 'ftp' | grep -o 'product=".*"' | cut -d \" -f2 | grep -o '^\S*'  > srch.txt
  	cat $LOG2 | grep 'ftp' | grep -oE 'version="[0-9]?.[0-9]?.' | grep -Eo '[0-9]?.[0.9]..' >> srch.txt
  	vv=$(cat srch.txt)
  	if [ ! -z srch.txt ]; then
  		echo 'Searching exploitdb for' $vv
  		searchsploit $vv
  		echo ' '
  		
  	else
  		echo ' '
  	fi
    else
      echo ' '
    fi
  }
  ftp_
  
  smb_() {
    if (cat $LOG2 | grep -q 'smb'); then
  	rm srch.txt
  	touch srch.txt
  	cat $LOG2 | grep 'smb' | grep -o 'product=".*"' | cut -d \" -f2 | grep -o '^\S*'  > srch.txt
  	cat $LOG2 | grep 'smb' | grep -oE 'version="[0-9]?.[0-9]?.' | grep -Eo '[0-9]?.[0.9].' >> srch.txt
  	vv=$(cat srch.txt)
  	if [ ! -z srch.txt ]; then
  		echo 'Searching exploitdb for' $vv
  		searchsploit $vv
  		echo ' '
  		echo 'Analyzing smb vulnerabilities'
          nmap $ip --script=smb-vuln\* -v
          echo ' '
  		
  	else
  		echo ' '
  	fi
    else
      echo ' '
    fi
  }
  smb_
  
  web_() {
    if (cat $LOG2 | grep -q 'http'); then
  	rm srch.txt
  	touch srch.txt
  	cat $LOG2 | grep 'http' | grep -o 'product=".*"' | cut -d \" -f2 | cut -d " " -f1,2  > srch.txt
  	cat $LOG2 | grep 'http' | grep -oE 'version="[0-9]?.[0-9]?.' | grep -Eo '[0-9]?.[0.9].' >> srch.txt
  	vv=$(cat srch.txt)
  	if [ ! -z srch.txt ]; then
  		echo 'Searching exploitdb for' $vv
  		searchsploit $vv
  		echo ' '
  		echo 'Analyzing http vulnerabilities'
          nmap $ip --script=http-vuln\* -v
          echo ' '
  		
  	else
  		echo ' '
  	fi
    else
      echo ' '
    fi
  }
  web_
)

#TODO: print out the discovered versions and services above each searchsploit query

smb_scan_old() {
  cat $ropen | grep 139 | greprc=$?
  if [[ $greprc -eq 0 ]]; then
    echo "Found open SMB ports"
    echo " "
    enum4linux $ip
  fi
}

smb_scan() {
  echo "\n"
  echo "Checking for standard SMB service to scan with enum4linux"
  if grep -q -E '(^|, )139(,|$)|(^|, )445(,|$)' $rports; then
    echo "Found open SMB ports"
    echo " "
    enum4linux $ip
  else echo 'SMB not found'
  echo "\n"
     
  fi
}

# still developing this function
touch output/scan_$ip/lfi_output.txt
lfi_out=output/scan_$ip/lfi_output.txt
lfi_scan() {
  cat $web_out | grep php | sed -e's,^\(.* (\).*,\1,g' | cut -d ' ' -f1 > output/tmp.txt
  file=$(cat output/tmp.txt)
  for line in $file; do
    gobuster fuzz --url http://$ip/$line/?file=FUZZ -w /usr/share/wordlists/SecLists-master/Fuzzing/LFI/LFI-LFISuite-pathtotest-huge.txt -b 404,400 -o $lfi_out
  done
}

lfi_analysis() {
  echo "Full LFI output file available at lfi_output.txt"
  echo "Starting LFI output analysis for interesting results"
  echo " "
  nums="[0-9]+"
  for i in 200 201 202 302 301 304 305 307 308; do   
    stat=$(cat $lfi_out | grep -o Status=$i |   wc -l)
    echo "Status code ($i): " $stat
  done
  res=$(cat $lfi_out | grep -rohP Length=[0-9\.]+ | sort -u)
  for nums in $res; do
    occ=$(echo $nums && cat $lfi_out | grep $nums | wc -l)
    echo "Length frequencies (Length | Frequency): "$occ
    echo " "
  done
  echo "The results of this output are best analyzed manually; try searching for the least frequent results first."
  echo "For example: cat lfi_output.txt | grep Length=<output with least ocurrence>"
  echo " "
}
```
The next block of functions are my attempt at a targeted vulnerability discovery process. I'm still working on improving this section as the grep 
parsing is not always great. The intention is to grab service name and version and search it with searchsploit, however, sometimes this ends up
with double service names instead of version, or is missing the version, so I will have to continue to refine this. 
```
formatter() {
  #cat vulnchk_10.11.1.111.xml| grep -Po 'portid="*[0-9]+."' | tr -d 'portid="' | sed 's/$/,/' | tr -d '\n' >> report_$ip.txt
  echo 'Target: '$ip 
  echo 'Hostname: '
  echo 'TCP:\r' && cat $rports |  awk '/->/{print $3}' | tr -d '[]' 
}

subd() {
  if [ ! -z "$domain" ]
  then
    sublist3r -d $domain
    dig ANY $domain @$ip
    dig ANY $domain
    dnsrecon -d $domain -n $ip -t a
  else
	
    dig ANY $ip
  fi
}

# start function create the output file to which the scans will be written. 
start() {
  echo -n "Starting in.." 
  for i in {3..1}
  do
    echo -n "$i"
    sleep 0.5
    echo -n "."
    sleep 0.25
    echo -n "."
    sleep 0.25
    echo -n "."
    sleep 0.25
    echo -n "."
    sleep 0.25
  done
  echo " "

}

#main function runs the scan functions after usage info and initilization has completed. 
main() {
  # Check if either ip or domain is provided
  if [ -z "$ip" ] && [ -z "$domain" ]; then
    echo "Please provide either -i or -d option"
    exit 1
  fi
  
 
  if [ ! -z "$nmap" ]
  then
    echo "Starting inital nmap scan on $ip using top 1000 ports."
    echo " "
    dircreate 
    rustall
    nmap_run
  fi
    
  if [ ! -z "$network" ]
  then
    echo "Starting full network scan.."
    echo " " 
    dircreate
    #what
    search_discover
    rustall
    nmap_run    
  fi
  
  if [ ! -z "$exp" ]
  then
    dircreate
    echo "Searching for public exploits"
    searchspl
  fi
  if [ ! -z "$help" ]
  then
    help
  fi
  if [ ! -z "$sub" ]
  then
    dircreate
    echo "Starting subdomain discovery"
    subd
  fi
  
  if [ ! -z "$smb" ]
  then
    dircreate
    smb_scan
  fi
  
  if [ ! -z "$web" ] && [ ! -z "$ip" ] 
  then
    dircreate
    echo "Gathering web server information and starting directory enumeration on http://$OPT"
    #what
    search_discover
    #web_server
  fi
  
  if [ ! -z "$web" ]
  then
    web_server_d
  fi
  
  if [ ! -z "$lfi" ]
  then
    dircreate
    echo "Starting PHP/LFI scan"
    lfi_scan
    lfi_analysis
  fi
  
  if [ ! -z "$all" ]
  then
    dircreate
    echo -e "${BOLDGREEN}All commands enabled${ENDCOLOR}"
    #what
    rustall
    nmap_run
    search_discover
    searchspl
    web_server
    subd
    smb_scan
    lfi_scan
    lfi_analysis
  fi
#  if [ "${#}" -eq 0 ]; then
#    
#    >&2 echo "No arguments provided"
#    help
#    
#  fi

  formatter

}

main


```
The end of the script simply parses the switches used and then calls the relevant function. As mentioned earlier, I related
general functions to the switches rather than the functions themselves so, as can be seen above, multiple functions can be called
with the use of a single switch and to more easily add output messages without editing every function. 

