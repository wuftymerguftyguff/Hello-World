var Answers = {} ; //Globally Scoped

google.load("jquery", "1.5.2");
google.setOnLoadCallback(function(){
	initNeck();
   });

function initNeck() {
     defines();
     drawFretboard();
     drawControls();
     drawScoreBoard();
}



function defines() {
	note = new Object;
	note['0'] = 'A';
	note['1'] = 'A#';
	note['2'] = 'B';
	note['3'] = 'C';
	note['4'] = 'C#';
	note['5'] = 'D';
	note['6'] = 'D#';
	note['7'] = 'E';
	note['8'] = 'F';
	note['9'] = 'F#';
	note['10'] = 'G';
	note['11'] = 'G#';

	openString = new Object;
	openString['1'] = 7;
	openString['2'] = 2;
	openString['3'] = 10;
	openString['4'] = 5;
	openString['5'] = 0;
	openString['6'] = 7;
}

function drawControls() {
	$('body').append(createDOMElement('div','controls'));
	$('#controls').append(createDOMElement('button','goButton'));
	$('#goButton').append('GO!');
	$('#controls').append(createDOMElement('span','testInstructions'));
	$('#goButton').click(function() {runTest();} );	
}

function drawScoreBoard() {
	$('body').append(createDOMElement('div','scoreboard'));

	// Total Questions Asked
	$('#scoreboard').append(createDOMElement('span','totalQuestionsLabel'));
	$('#totalQuestionsLabel').append('Total Questions Asked: ');
	$('#scoreboard').append(createDOMElement('label','totalQuestions'));
	$('#totalQuestions').append('0');

	// Correct Answers
	$('#scoreboard').append(createDOMElement('span','correctAnswersLabel'));
	$('#correctAnswersLabel').append(' Correct Answers: ');
	$('#scoreboard').append(createDOMElement('label','correctAnswers'));
	$('#correctAnswers').append('0');
}


function createDOMElement(domType,domId) {
	var domElement = document.createElement(domType);
	domElement.id = domId;
	return domElement;		
}

function runTest() {
	//Answers.thisNote = randomNote();
	Answers.thisNote = 0;
	Answers.thisString = randomString();
	$('#testInstructions').text('Click on an ' + getNoteName(Answers.thisNote) + ' on string ' + Answers.thisString);
	var qcount = parseInt($('#totalQuestions').text());
	incrQuestionCount();
}

function incrQuestionCount() {
	var qcount = parseInt($('#totalQuestions').text());
	qcount++;
	$('#totalQuestions').text(qcount);
}

function incrCorectCount() {
	var qcount = parseInt($('#correctAnswers').text());
	qcount++;
	$('#correctAnswers').text(qcount);
}

function drawFretboard() {
	for (numString=1;numString<=6;numString=numString+1) {
		var $stringDiv =  document.createElement("div");
		$stringDiv.id = 'string-' + numString;
		var stringContainer = '#' + $stringDiv.id;
		$stringDiv.className = 'string';
		$('#neck').append($stringDiv);
		$(stringContainer).append(numString);
		for (numFret=0;numFret<=13;numFret=numFret+1) {
			var $fretDiv = document.createElement("div");
			$fretDiv.id = 'string-' + numString + '-fret-' + numFret;
			var fretContainer = '#' + $fretDiv.id;
			$(stringContainer).append($fretDiv);
	//		$(fretContainer).append(numFret);
	//		$(fretContainer).append( getNoteName(getNoteVal(numString,numFret)));
			$(fretContainer).addClass("fret");
			$(fretContainer).addClass("string-" + numString);
			$(fretContainer).addClass("fret-" + numFret);
			var imgTag = createDOMElement('img');
			imgTag.setAttribute('href', '/images/string' + numString +  '-fret.jpg');
			$(fretContainer).append(imgTag);
			$(fretContainer).data("neck", { string: numString, fret: numFret });
			

			$(fretContainer).click(function() {
				// alert( getNoteName(getNoteVal( $(this).data("neck").string, $(this).data("neck").fret )));
				if ( getNoteVal( $(this).data("neck").string, $(this).data("neck").fret ) == Answers.thisNote &&  $(this).data("neck").string == Answers.thisString ) {
					 incrCorectCount();
				}
				runTest();

			});
			

			
			
		}
	}
     	resizeFrets(); 
}

function getNoteVal(string, fret) {
	var noteVal = ( openString[string] + fret )  % 12;
	return noteVal;
}

function getNoteName(noteVal) {
	return note[noteVal];
}

//function to get random number between two numbers 
function randomBetween(minVal,maxVal,floatVal) {  
	var randVal = minVal+(Math.random()*(maxVal-minVal));  
	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

function randomString() {
	 return randomBetween(1,6);
}

function randomNote() {
	return randomBetween(0,11);
}

function randomFret() {
	return randomBetween(0,13);
}

function resizeFrets() {
var neckSize = $('#neck').width();
var distFromNut = 0;
var scaleLength =  neckSize * 2.5; 
var distFromBridge =  scaleLength;
var fudgeFactor = 17.817;
for (numFret=1;numFret<=13;numFret=numFret+1)
{
var fretSize = distFromBridge / fudgeFactor;
var div = document.getElementById('string-1-fret-' + numFret);
div.style.width = fretSize + 'px';
distFromNut = distFromNut + fretSize;
//alert("Fret: " + numFret + " Dist From Bridge: " + distFromBridge );
distFromBridge =  scaleLength - distFromNut;
}
}

function pickNote() {
var randomstring=Math.floor(Math.random()*5) +1;
var randomfret=Math.floor(Math.random()*12) +1;
alert(randomstring);
alert(randomfret);
}
