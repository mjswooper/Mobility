/*
Javascript for Calculator 
	by Jesse Wheeler, for Bond University Mobility 2013

This is completely my own creation, with little outside input.

This calculator performs basic calc functions, with the addition of memory also.
The general aim will be to: capture input, logically test it for the right test, calculate internally and store in variables, show the results via innerHTML.

Functions of importance:
 
  calc ( string a )
 	 This function will be placed only on the number button on the calculator css spans. 
  	To allow the calculator to show 777 from 3 7-button presses, the number valiables will be kept as strings and concatonated. Then parsed into numbers for calculations.
	This calls the display function  with args 1 for first number and 2 for second.


  operator (string cmd)
    This function sets the operator from the input. 
    Also  manages following calculations.

  display ( int arg)
  	this function is designed to display the results of calculations/functions on to the screen.
  	Essentially this was so that the screen was only showing data - nothing is grabbed off it.
  	1 = display first number and operator
  	2 =  operator and second number
  	The function also maintains the 10 digit rule (not including operator)

  Mem(string x)
  	This ended up beign retardedly complex.  the function sanitizes everythign into numbers
  	to then adjourn, based off variables used, which number is to be stores when M+ is used.	
	Also performs the basics.

 	Design decisions: order of operations is not provided. 7 + 7 = 14, then + 7 will equal 21  and so forth
  	This is because when the operator is selected after the equals, the result is shifted to the first result and we proceed from there. Similar to the old, cheap calculators of past, not current scientific. I beielive this was beyond the scope of the assignment though, would be an interesting thing to implement.

	This JS file could be used in any program given the right buttons kept and scren ID.
	the thre main input functions are calc, operator, eval and clear.

	Known bugs: 1*2 and 1*1 dont seem to work.
			Buttons seem sticky or sometiems unresponsive? deep, full clicks needed. easing?

*/

var firstNum = ""; // the first number given to the calculator. gets result after equals and further operator.
var calcOp = ""; //the operator to use between the first and second number
var secondNum = ""; //emptied of second number on equals
var result = "";  
var calcMem = ""; //used for the memory buttons.

//var inputScr = document.getElementById("screen"); doesnt not work for me for reason? :/ 

function calc(btnNum) {

	if (calcOp == "") {
	 // if this is the first number entered
		
		firstNum = firstNum + "" + btnNum;
		////alert("set first num: " + firstNum + btnNum);
		display(1);
	}
	else {
	 // operator chosen, thus time for second number
		////alert("set second num");
		secondNum = secondNum + "" + btnNum;
		display(2);
	}
	
	//if the numbers are up on the screen already and a number is clicked again, there should be no response.
	////alert("variables: " + firstNum + " " + calcOp + " " + secondNum + " " + result);

}

function operator(x) {
	
	calcOp = x;
	
	var  flag = false; //dirty hax flag to detect 3+3(+)3 - the second operator without equals.
	//alert("variables: " + firstNum + " " + calcOp + " " + secondNum + " " + result);
	// if there is a 3+3+4
	if  (firstNum != "" && calcOp != "" && secondNum !="") {
			//evaluate the first two (3+3)
			equals();
			firstNum = result;
			secondNum = ""; //house keeping.
			result = "";
			flag = true;
	}	
	//check if there was an operation prior: ie 3 + 5 = 15 + 5
	else if (calcOp != "") {
	// there was, shift values to firstNum
	firstNum = result;
	secondNum = ""; //house keeping.
	result = "";
	}
	
	
	if ( x == "+" ) { calcOp = "+"; }
	if ( x == "-" ) { calcOp = "-"; }
	if ( x == "*" ) { calcOp = "*"; } //multiplication
	if ( x == "/" ) { calcOp = "/"; } //division
	if  (flag == true) { 
		display (calcOp); 
	}
	else { 
		display(1); 
	}
	//alert("variables: " + firstNum + " " + calcOp + " " + secondNum + " " + result);
}

function error() {
	//alert("variables: " + firstNum + " " + calcOp + " " + secondNum + " " + result);
	clearCalc();
	display("error");
}

function clearCalc() {
	firstNum = "";
	secondNum = "";
	calcOp = "";
	result = "";
	display(result);
}

function equals() {
	//for best results, the argment, sum, shoudl be a string "123 + 123"
	//eval is the golden function built into JS that solve maths with either a number or string.
	
		//in case the operator is still null, lets assume a zero
		// thus 7 + not equals 7 + 0 as convention dictates. 
		if (secondNum == "") { secondNum = 0; }
		//alert("variables: 1st: " + firstNum + " " + calcOp + " 2nd: " + secondNum + " result: " + result);
		result = eval(firstNum + calcOp + secondNum);
		
			display(result);	
		
		//reverse such assumption for other functions.
		if (secondNum == 0) { secondNum = ""; }
}

function display(arg) {

	if (result.toString().length > 10 || result.length > 10 || firstNum.length > 10 || secondNum.length > 10) {
		//thisis NOT adequate - 10 digit max on display ? check or 10 per number
	
		//intercepting both number as input and after computation (our computer can candle more than 10 digits). Beware a potential infinite loop here.
		//alert(result.length + " " + firstNum.length + " " + secondNum.length);
		error();
	}
	else if (arg == 1) {
		//the first number beign displayed with the operator
		document.getElementById("screen").innerHTML = firstNum + " " + calcOp;
	}
	else if (arg == 2) {
		//operator retained for saek of rememberance 
		document.getElementById("screen").innerHTML = calcOp + " " + secondNum;
	}
	else {
		document.getElementById("screen").innerHTML = arg;
	}
	
}

function mem(cmd) {

	//There are probably easier ways to do this. 
	//With the memory function we need take the number presented on the screen and store it, change it and show it.
	// With the operators there, i will logically test which value to pick out as the lastest to use.
	//This testing will make the commands easier to use
	//issues with numbers concatonating, not adding. eval and parseInt used as backups to clean inputs.
	

	var latestNum = 0; //store the number to add to memory.
	
	//alert(firstNum + " " + secondNum + " " + result);

	if (firstNum != "" && secondNum == "" && result == "") {
		latestNum = parseInt(firstNum);
	}
	else if (firstNum != "" && secondNum != "" && result == "") {
		latestNum = parseInt(secondNum);
	}
	else if (  secondNum != "" && result != "" ||
				firstNum == "" && secondNum == "" && result != "" ||
				firstNum == "" && secondNum != "" && result != ""){
		latestNum = parseInt(result);
	}
	else if (firstNum == "" && secondNum == "" && result == "") {
		latestNum = calcMem;
	}
	else {
		//alert("error: latestNum - " + latestNum);
		error(); // failsafe catch all.
		cmd = "";
	}
	
	
	if (cmd == "m+") { 
		calcMem = eval(calcMem + latestNum);
		//alert(calcMem + " " + latestNum);
		}
	
	if (cmd == "m-") { 
		calcMem = eval(calcMem - latestNum); 
		//alert(calcMem + " " + latestNum);
		}

	if (cmd == "mr") { display(latestNum); } //or just calcMem. keeps versatility and catch all.
	//alert(cmd);
	if (cmd == "mc") { calcMem = ""; }
	
	//alert(calcMem + " " + cmd);
}