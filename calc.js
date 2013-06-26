/*
Javascript for Calculator - by Jesse Wheeler, for Bond University Mobility 2013

This is completely my own creation, with little outside input

This calculator performs basic calc functions, with the addition of memory also.
The general aim will be to: capture input, logically test it for the right test, calculate internally and store in variables, show the results via innerHTML.

Functions:
 
 calc ( string a )
  This function will be placed only on the number button on the calculator css spans. 
  To allow the calculator to show 777 from 3 7-button presses, the number valiables will be kept as strings and concatonated. Then parsed into numbers for calculations.

  
  design decision: order of operations is not provided. 7 + 7 = 14, then + 7 will equal 21  and so forth
  This is because when the operator is selected after the equals, the result is shifted to the first result and we proceed from there. Similar to the old, cheap calculators of past, not current scientific. I beielive this was beyond the scope of the assignment though, would be an interesting thing to implement.

*/

var firstNum = "";
var calcOp = "";
var secondNum = "";
var result = "";
var calcMem = "";

//var inputScr = document.getElementById("screen"); doesnt not work :/

function test(x) {
	alert(x);
}

function calc(btnNum) {

	if (calcOp == "") {
	 // if this is the first number entered
		
		firstNum = firstNum + "" + btnNum;
		//alert("set first num: " + firstNum + btnNum);
		display(1);
	}
	else {
	 // operator chosen, thus time for second number
		//alert("set second num");
		secondNum = secondNum + "" + btnNum;
		display(2);
	}
	
	//if the numbers are up on the screen already and a number is clicked again, there should be no response.
	//alert("variables: " + firstNum + " " + calcOp + " " + secondNum + " " + result);

}

function operator(x) {
	
	//check if there was an operation prior:
	if (calcOp != "") {
	// there was, shift values to firstNum
	firstNum = result;
	secondNum = ""; //house keeping.
	result = "";
	}
	
	if ( x == "+" ) { calcOp = "+"; }
	if ( x == "-" ) { calcOp = "-"; }
	if ( x == "*" ) { calcOp = "*"; } //multiplication
	if ( x == "/" ) { calcOp = "/"; } //division
	
	display(1);
}

function error() {
	alert("variables: " + firstNum + " " + calcOp + " " + secondNum + " " + result);
	clearCalc();
	display("error");
}

function clearCalc() {
	firstNum = "";
	secondNum = "";
	calcOp = "";
	result = "";
	display(result);
	//alert("cleared");
	
}

function equals() {
	//for best results, the argment, sum, shoudl be a string "123 + 123"
	//eval is the golden function built into JS that solve maths with either a number or string.
	
		//in case the operator is still null, lets assume a zero
		// thus 7 + not equals 7 + 0 as convention dictates. 
		if (secondNum == "") { secondNum = 0; }
		
		result = eval(firstNum + calcOp + secondNum);
		
			display(result);	
		
		//reverse such assumption for other functions.
		secondNum = "";
}

function display(arg) {

	if (result.toString().length > 10 || result.length > 10 || firstNum.length > 10 || secondNum.length > 10) {
		//thisis NOT adequate - 10 digit max on display ? check or 10 per number
	
		//intercepting both number as input and after computation (our computer can candle more than 10 digits). Beware a potential infinite loop here.
		alert(result.length + " " + firstNum.length + " " + secondNum.length);
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
	if (cmd == "m+") { 
		//tricky as to what input to take, the way things are setup. thus we force an evaluation/equals.
		//eval();
		}
	if (cmd == "m-") { calcMem -= 1; }
	//if (cmd == "mr") {
	//	if (calcMem != "") ? error() : display(calcMem);
	//	}
	if (cmd == "mc") { calcMem = ""; }
	
	alert(calcMem + " " + cmd);
}