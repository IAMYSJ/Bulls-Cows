$(document).ready(function() {
	/*
		亂數產生4位不重複的數字
	*/
	var allNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	answerNumArray = [];
	for(var i = 0; i < 4; i++) {
		var getNum = Math.floor(Math.random()*allNum.length);
		answerNumArray[i] = allNum[getNum];
		allNum.splice(getNum, 1);
	}
	var answerNum = answerNumArray[0]*1000 + answerNumArray[1]*100 + answerNumArray[2]*10 + answerNumArray[3];
	/* 
		開始猜數字
	*/
	var guessTime = 1;
	$('#confirmBtn').click(function() {
		// 1. 取得玩家輸入的數字
		// 2. 拆成千位、百位、十位、個位
		var guessNum = document.getElementById('guessNum').value;
		guess1 = Math.floor(guessNum/1000);
		guess2 = Math.floor((guessNum - guess1*1000)/100);
		guess3 = Math.floor((guessNum - guess1*1000 - guess2*100)/10);
		guess4 = Math.floor(guessNum - guess1*1000 - guess2*100 - guess3*10);
		if(guessTime < 9) {
			if(guessNum.length >= 4) {
				if(guessNum != answerNum) {
					$('#content').append("<tr><td>" + guessTime + "</td><td>" + guessNum + "</td><td>" + numHint() + "</td></tr>");
				} else {
					$('#content').append("<tr><td>" + guessTime + "</td><td>" + guessNum + "</td><td>" + numHint() + "</td></tr>");
					alert('Congratulations!');
					$('#confirmBtn').prop('disabled', true);
					$('#restartBtn').css('display', 'inline');
				}
				guessTime++;
			} else {
				alert('Please enter a 4-digits number!');
			}
			console.log(guessTime);
		} else {
			$('#content').append("<tr><td>" + guessTime + "</td><td>" + guessNum + "</td><td>" + numHint() + "</td></tr>");
			$('#content').append("<tr><td>Answer</td><td>" + answerNum + "</td>");
			$('#confirmBtn').prop('disabled', true);
			$('#restartBtn').css('display', 'inline');
		}
	});
	// 重新開始
	$('#restartBtn').click(function() {
		location.reload();
	});
});
/*
	判斷幾A幾B
*/
function numHint() {
	var countA = 0;
	var countB = 0;
	switch(guess1) {
		case answerNumArray[0]:
			countA++;
			break;
		case answerNumArray[1]:
			countB++;
			break;
		case answerNumArray[2]:
			countB++;
			break;
		case answerNumArray[3]:
			countB++;
			break;
	}
	switch(guess2) {
		case answerNumArray[0]:
			countB++;
			break;
		case answerNumArray[1]:
			countA++;
			break;
		case answerNumArray[2]:
			countB++;
			break;
		case answerNumArray[3]:
			countB++;
			break;
	}
	switch(guess3) {
		case answerNumArray[0]:
			countB++;
			break;
		case answerNumArray[1]:
			countB++;
			break;
		case answerNumArray[2]:
			countA++;
			break;
		case answerNumArray[3]:
			countB++;
			break;
	}
	switch(guess4) {
		case answerNumArray[0]:
			countB++;
			break;
		case answerNumArray[1]:
			countB++;
			break;
		case answerNumArray[2]:
			countB++;
			break;
		case answerNumArray[3]:
			countA++;
			break;
	}
	return countA + "A" + countB + "B";
}