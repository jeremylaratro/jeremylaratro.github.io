Defensive Security
-------

[Back to Table of Contents](../cysec)

## Various methodologies and overviews: 

---
>## Cyber Kill Chain
  - Recon
  - Payload or Method Creation
  - Payload Delivery
  - Exploitation and Installation
  - Remote Access and Control
  - Objective

>## Attack Lifecycle
  - Recon
  - Compromise
  - Foothold
  - Privilege Escalation, Internal Recon, Persistence
  - Objective Completion

--
 >## Recon: enumeration, fingerprinting, OSINT
 During the recon stage, the attacker will attempt to find potential access points or vulnerabilities, whether via software/hardware, policy implementations, or social engineering
 >## Compromise, Payload Creation
 This stage utilizes  the information attained during the recon stage, and attempts to act on that information. This can be through known vulnerabities or through crafted attacks containing custom payloads or malware delivered via social engineering
 >## Foothold or Exploitation
 Once the attack methodology is decided and the exploit or attack is attempted, the attacker may gain a foothold with initial access or exploitation. For non-malware attacks, this will be first access into the target, which could be a low-privilege user or access to a filesystem from a web server. For malware-related attacks, this would be initial download of the malware, which in the case of a RAT, will give the attacker privileges equal to those in which the infected victim either has or has access to. 
 >## Privilege Escalation, Internal Recon, and Persistence
 After the attacker gainsa foothold, they may only have restricted access and must find a way to escalate the privileges to root or another high-privileged user in order to effectively take control of the machine and complete the objective at hand. 
 This also involves internal recon, as the attacker has to understand the system they are attacking in order to figure out a way to exploit it and the find the desired data, information, or flag in the case of a CTF-like scenario. 
