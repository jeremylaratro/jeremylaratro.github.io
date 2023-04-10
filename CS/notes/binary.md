## Computer Science - Binary

-----

[Back to Table of Contents](../cysec)

----

## Binary

Base 2 system
Two states -- off and on
|||
|--|--|
| Dec  | Binary |
| 1 | 1 |
| 2 | 10 |
| 3 | 11 | 
| 4 | 100 |
| 5 | 101 |
| 6 | 110 |
| 7 | 111 |
| 8 | 1000 |
| 9 | 1001 |
| 10 | 1010 | 

### Conversion to decimal / value

Determining the decimal value of binary is done via calculating the value of each bit from the LSB to MSB (right to left)
- binary * base 2 bit value 
	- 2^0, 2^1, 2^2, .. --> 2^8

#### Example:
10100110 

0 * 2^0 = 0
1 * 2^1 = 2
1 * 2^2 = 4
0 * 2^3
0 * 2^4
1 * 2^5 = 32
0 * 2^6 
1 * 2^7 = 128

2 + 4 + 32 + 128 = 166


---

Determing the max value is simple with the following equation:

```python
(2**n)-1

```
```
def binary():
  n = input(f'Enter bit value: ')
  m = (2**(int(n)))-1
  print(f'max binary value for {n} bit value is {m}')
  
binary()
```

```
binary = '100110'
decimal_conversion1 = 0
for i in range(len(binary)):
   digit = binary[len(binary) - 1 - i]
   print(digit)
   if digit == '1':
       decimal_conversion1 += 2**i
      
print(decimal_conversion1)

```

### Adding Binary

1 + 0 = 1
1 + 1 = 10
1 + 1 + 1 = 11
(1 + 1 + 1) + 1 = 11 + 1 = 100 

```
Binary  | Decimal
  1111  |  1
  	|
 101101 |  45
+   111 | + 7
------- | ---
 110100 |  52
 ```
 
 ```
 
 1 + 1 = 10
 10 + 10 = (1 + 1) + (1 + 1)
 
 10
 10
 --
  100
 
 ---
 
    1 
 101011
  10010
 ------
	 111101
	 
111111111	 
1110111011
+ 11010111
----------
 10010010010

```

### subtracting binary

-    1 - 0 = 1
-   10 - 1 = 1
-   11 - 1 = 10

101 - 1 = 
```
101
- 1
----
 100
 
 0
 10010
 01011
 -----
  10010
```
