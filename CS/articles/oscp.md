# Passing the OSCP

---

[Back to Table of Contents](../cysec)

---

### How I passed the OSCP and scored a 100 on my first attempt

#### Background:
I had been interested in ethical hacking ever since I first used a computer, and used to browse forums like hackforums learning about all the different types of attacks and methodologies behind them back in middle school and high school.

Back then, however, cyber security was not a popular topic. Sites were extremely insecure and dial-up connections were just about phased out. I didn't know that I could do anything with this passion, unfortunately, so I spent the next decade essentially misguided and unsure of what I wanted. I mostly forgot about hacking, cybersecurity, and infosec. 
Then, the pandemic hit, and the free time it provided turned out to be a blessing, because I rediscovered my passion for not only infosec, hacking, and computers, but also my passion for electronics and building things. It was too late, however, to change my degree to computer science or electrical engineering, so I kept at my degree while using my free time to learn.

During this time I got heavily involved with amateur radio, aggressively educated myself on programming, PCB design, Arduino, STM, Raspberry Pi, circuit design and theory, and did everything from designing my own PCB for a class A amplifier, milling the PCB on a copperclad board with the CNC machine I constructed, and soldering the components, to making a TryHackMe account and getting involved with CTFs.

I also started a small online business where I would procure used or broken engineering equipment and electronics from government surplus auctions, then troubleshoot and fix them, refurbish them, and resell them online. I also programmed radios. 

I believe that all of this experience greatly supported my path towards the OSCP, even though I did not know it at the time. 

#### Past two years:
In the 1-2 years leading up to starting the OSCP course, I started to heavily pursue programming. I focused on python but also did some C++ (which I also did with Arduino), Golang, Java, and Javascript. I tried Rust, but I can't say that I was a fan.
This involved creating accounts on codecademy, exercism, leetcode, among a few others, as well as reading books on algorithm structure and theory and python programming. I feel that this certainly helped me in terms of the OSCP as I found that a lot of people were getting stuck on either fixing or modifying exploit PoCs, whereas that was an area where I was excelling due to this past experience. 

In the past year, I started to more intensely involve myself in CTFs and cybersecurity-specific challenges. I started to use platforms like picoCTF, TryHackMe, HackTheBox, among others to learn and further expand my knowledge. 
My graduation date for USF was August of 2022 and I basically planned that once I graduated, I would go full intensity on gearing up for the OSCP and in cultivating my knowledge and skills in general. At that time, however, I was unsure which cert I was going to start with as I had seen people saying that OSCP would be too difficult without prior experience, but I eventually decided that I was up for the challenge. 

From August to December, I put a massive amount of work into TryHackMe, quickly excelling into the top 2% of users and winning my first King of the Hill (a challenge where you and a group of other people need to hack a machine, then keep your username within a text file on the root directory for the longest time, in turn trying to harden the systems and keep others out to keep you in the lead), as well as HackTheBox and BurpAcademy. 

In December, I finally enrolled in the PEN200 course and my OSCP journey was coming to a peak. 

I set out a pretty simple strategy for the OSCP course.

#### Course:
- complete the topic exercises for extra credit -- but do them in a learning-conducive manner while maintaining efficiency.

- complete at least 40 machines, both entire AD sets (I did one of them twice also), and at least one machine in every network (public, dev, admin, and IT) to practice tunneling and pivoting: 
  - I knew that realistically, I would not complete 70 machines in 90 days plus the exercises and simultaneously get all that I could out of those machines and exercises. I did not want to rush through them and root 70 boxes for the sake of rooting 70 boxes. I wanted to make sure that I took something away from each machine I did. With that said, select the machines wisely. Do all of the past exam machines in IT if possible and the "big 4"

- don't spend too much time on a machine - use hints when stuck for more than 30 mins - hour, but hint usage should linearly decrease relative to days passed of the 90 day access.

- do 'practice exams' once a month: the first two I did not write a report. The last one I did not allow any hints and wrote a report for.

- After lab access ended, I spent about 2 1/2 weeks doing PG practice and HTB from TJ Null's list. I did sprinkle in the occasional PG play/practice and HTB machine during the course as well.

- I recommend doing Wreath on THM to learn about tunneling in AD, as well as the Windows and Linux PrivEsc rooms.

Due to being comfortable with a lot of the topics from THM and the other sites, I did not do the course linearly. I did topics in whatever order I felt was most beneficial to me and I started on machines I felt most confident about based on my previous knowledge. This kept me engaged. I'm not sure I would've been able to spend 8 hours straight doing just exercises, the machines gave me a bit of a challenge to look forward to. You'll have to judge for yourself what strategy to use in that regard though.

#### Exam:

- AD + 1: complete the active directory network first, or if stuck, one machine then AD, thus securing a passing score (60 + 10).

- use the allotted time: I decided that I would take advantage of the full time slot before officially ending the exam (even though I "passed" in about 10-11 hours). The extra time would allow me to go back and review my work, reporting, etc. after taking a break and then again after getting some sleep.

I was able to complete all but one of the exam machines -- I obtained a foothold on the system but was unable to escalate privileges on that last one I did.

There's no escaping the diminishing mental state that comes with doing something for that long, so make sure to prioritize and be efficient. I used my enumeration script which greatly helped with automating enumeration and discovery. 

---

### Next Steps, Goals, and Aspirations

The next step is to kickstart my infosec career and find a company that values determination and motivation, where I can prove myself a valuable member of both the company and the infosec community as a whole. 
This a field of perpetual learning and I am glad to be a part of that -- where I will always have the opportunity to learn something that I didn't know the day before. 


Short-Term Goals:
 - Find a job in an offensive security role. My passions lie specifically in IoT and netpen, but I value learning new things and am always open to new opportunities. 


Long-Term Goals:
 - Red Team - IoT, hardware, netpen -- ideally one that incorporates physical pentesting as well.
 - security clearance
 - Master's Degree and ultimately a managerial infosec position