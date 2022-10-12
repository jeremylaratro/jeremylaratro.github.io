## Go Notes

>> Syntax & Overview: 
>
> - Statically typed
> - Compiled ('go run file_name.go'), simpler than C++'s 'g++ filename.cpp' -> './a.out'
> - packages similiar to python modules but different syntax, ie: \
> package main \
> import ("fmt") 
> - No semicolons necessary, unlike C/C++, but curly braces used. Functions start with func, arguments must include type, and output type must also be specified. 
> - General structure:
> ```go
> packages 
> imports
> func(arg type) ouput_type {
>   function details
> }
> ```
> ```go
> package main
> import "fmt"
> func add_567(num int) int {
>   var sum int 
>   i := 567
>   sum = num + i
>   return sum
> }
> func main() {
>   fmt.Println(add_567(5))
> }
> ```
>  ---  
> 
> No defined keyword for while loops, instead use for loop as in this simple guessing game. 
>```go
>package main
>import (
>
>	"fmt"
>	"math/rand"
>)
>
>func generate_random() int {
>	fmt.Println("Generating random number...")
>	num := rand.Intn(100)
>	fmt.Println(num)
>	return num
>
>}
>func try() int {
>	var inp int
>	fmt.Println("Guess a number between 1 and 100:")
>	fmt.Scan(&inp)
>	return inp
>}
>
>func main() {
>	var randm int = generate_random()
>	var guess int
>	guess = try()
>	for tries := 4; tries > 0; tries-- {
>
> ```
>---
> Infinite Loops can be used with:
> ```go
> for {
>   function
> }
>```
> Like python, JS, and many other languages, Go contains useful iterative tools like map, range, continue, break, etc. 
> 
> Accessing items in an array in Go is made fairly simple and intuitive with the map function.
> If we have an array of resistors, with resistance and SMT package size, we can access and print the array:
> ```go
> package main
> import "fmt"
>
> func main() {
> 
>     resistors := map[int]string{
>         200: "0805",
>         150: "0605",
>     }
> 
>     for index, value := range resistors {
>         fmt.Println("Resistance: ", index, "Size: ", value)
>     }
> 
> }
>
>```
> (Used type string for package size instead of int just to show declaration method) \
> Learning the implementation of the map function in Go actually also improved my understanding and encouraged me to learn more about it, and
> implement it more frequently in python. 
> 