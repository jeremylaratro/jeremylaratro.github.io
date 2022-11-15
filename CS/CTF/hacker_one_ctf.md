## **HackerOne CTF**
[Back to Table of Contents](../cysec)

---
>>### Micro-CMS v2.0
> Three flags - Flag 0, Flag 1, Flag 2
> 
> Difficulty: Medium
> 
>This CTF is basically the more-secured version of Micro-CMS v1.0, which tested 
> the basic web exploitation skills. 
> 
> It became clear immediately that this one would be more difficult, as all the previously vulnerable
> elements were behind a login page. \
> I started my efforts with checking the login panel for SQL vulnerabilities.
> A traceback error was returned when I tried to login with:
> ```SQL
>  ' OR 1=1 --
>```
> The error message contained what appeared to be code to filter the input, however
> I did not feel that I understood the function process entirely.  
> 
> ![SQL Error](/CS/cs_img_dir/traceback.png)
> 
> I tried a bunch of other potential injections but was not having any luck so I moved on to SQLMap. \
> I also found something interesting while going to copy the POST request for SQLMap.
> I ended up using the --forms switch:
> ```bash
> sqlmap -u {url} --forms --thread 5 --random-agent 
> ```
> SQLMap succesfully identified the MySQL database and working injection points. \
>![SQLMap](/CS/cs_img_dir/injpnt.png) \
>Next, I used the --tables switch to understand the structure of the database
> and identify any tables that would be particularly useful rather than just dumping the entire database. 
> ![SQLMap Tables](/CS/cs_img_dir/tables.png)
> The database "level2" and table "admins" immediately stuck out. I dumped this table using:
> ```bash
> sqlmap -u {url} --forms --dbms=MySQL -D level2 -T admins --dump
> ```
> and SQLMap returned the sole admin account and the corresponding password, which happened to be in plaintext!
> ![SQLMap Dump](/CS/cs_img_dir/dump.png)
> 
> I was, however, a bit disappointed that I did not complete the challenge manually, so I decided to
> go back and try to bypass the authentication via the login page using manual SQLi. 
>  
> First, I copied the payloads that SQLMap found earlier into the username field to understand what kind of response the DB would give. \
> The first one returned an interesting error:
> ![SQL Error](/CS/cs_img_dir/payload1.png)
> 
> The second one caused the page to hang. \
> I continued to try various payloads and made some process, with the payload:
> ```SQL 
>  ' OR id=1#
> ```
> returning "invalid password" rather than "unknown user." I tried to formulate more complex payloads using aspects of the
> SQLMap payload, but I was unable to succeed. I think that an important part of learning is to understand your limits and
> rather than waste time, take the opportunity to learn something new, so I went online and searched to see if anyone
> else had been succesful in crafting a manual payload. 