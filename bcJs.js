$(document).ready(function() {
	answerNum = Math.floor(Math.random()*10000);
	var guessNum = document.getElementById('guessNum');
	var guessTime = 1;
	if(answerNum < 1000) {
		answerNum = answerNum*10 + Math.floor(Math.random()*10);
	}

	// 開始猜數字
	$('#confirmBtn').click(function() {
		if(guessTime < 9) {
			if(guessNum.value > 1000 && guessNum.value < 9999) {
				if(parseInt(guessNum.value) != answerNum) {
					$('#content').append("<tr><td>" + guessTime + "</td><td>" + guessNum.value + "</td><td>" + numHint(parseInt(guessNum.value)) + "</td></tr>");
				} else {
					$('#content').append("<tr><td>" + guessTime + "</td><td>" + guessNum.value + "</td><td>" + numHint(parseInt(guessNum.value)) + "</td></tr>");
					alert('Congratulations!');
					$('#confirmBtn').prop('disabled', true);
					$('#restartBtn').css('display', 'inline');
				}
				guessTime++;
			} else {
				alert('Please enter a 4-digits number!');
			}
		} else {
			$('#content').append("<tr><td>" + guessTime + "</td><td>" + guessNum.value + "</td><td>" + numHint(parseInt(guessNum.value)) + "</td></tr>");
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

function numHint(guessNum) {
	countA = 0;
	countB = 0;
	
	var guessNum1 = Math.floor(guessNum/1000);
	var guessNum2 = Math.floor((guessNum - 1000*guessNum1)/100);
	var guessNum3 = Math.floor((guessNum - 1000*guessNum1 - 100*guessNum2)/10);
	var guessNum4 = Math.floor(guessNum - 1000*guessNum1 - 100*guessNum2 - 10*guessNum3);
	
	var answerNum1 = Math.floor(answerNum/1000);
	var answerNum2 = Math.floor((answerNum - 1000*answerNum1)/100);
	var answerNum3 = Math.floor((answerNum - 1000*answerNum1 - 100*answerNum2)/10);
	var answerNum4 = Math.floor(answerNum - 1000*answerNum1 - 100*answerNum2 - 10*answerNum3);
	
	abHint(guessNum1, answerNum1, answerNum2, answerNum3, answerNum4);
	abHint(guessNum2, answerNum2, answerNum1, answerNum3, answerNum4);
	abHint(guessNum3, answerNum3, answerNum1, answerNum3, answerNum4);
	abHint(guessNum4, answerNum4, answerNum1, answerNum3, answerNum4);

	var result = countA + 'A' + countB + 'B';

	return result;
}

function abHint(guessNum, answerNum1, answerNum2, answerNum3, answerNum4) {
	if(guessNum == answerNum1) {
		countA++;
	} else {
		if(guessNum == answerNum2) {
			countB++;
		}
		if(guessNum == answerNum3) {
			countB++;
		}
		if(guessNum == answerNum4) {
			countB++;
		}
	}
}