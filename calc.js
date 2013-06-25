/*
Javascript for Calculator - by Jesse Wheeler, for Bond University Mobility 2013
*/

firstNum = null;
calcOp = null;
secondNum = null;
result = null;


function test(x) {
	alert(x);
}

function calc(btnNum) {
	if (isNaN(parseInt(btnNum))) {
		
		//If there is a result already from a previous calculation, we wish to add to it. thus:
		if ( result != null) {
			
			alert("add to previous resul");
			/*
			firstNum = result;
			result = null;
			calcOp = btnNum;
			secondNum = null;
			*/
		}
		else {
		
		alert("set operator");
		}
	}
	else if (firstNum == null)
	{
		
		//alert("set first num");
		firstNum = btnNum;
	}
	else {
		//alert("set second num");
		secondNum = btnNum;
	}
	
	//if the numbers are up on the screen already and a number is clicked again, there should be no response.
	alert("variables: " + firstNum + " " + calcOp + " " + secondNum + " " + result);

}