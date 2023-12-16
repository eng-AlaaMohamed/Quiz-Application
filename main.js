//Selecte Element
let spanToBullits = document.querySelector('.span-bullits-and-time .span');
let theTest = document.querySelector('.the-test');
let answerErea = document.querySelector('.answer-erea')
let button = document.querySelector('.button');
let question = document.querySelector('.question');
let result = document.querySelector('.result');
let timeDown = document.querySelector('.time-down');

//set Opation
let currentindex = 0;
let reightAnswer = 0;
let wrongAnswer = 0;
let timeDownIntirval;

//Fetch Json
fetch("html_questions.json").then((result) => {
    //Conversion Data To json
    let myData = result.json();
    return myData;
}).then((myData) => {
    //Length My Data
    let lengthMydata = myData.length;

    //Show Questions Count
    let questionsCount = document.querySelector('.questions-count');
    questionsCount.innerHTML = `Questions Count : ${lengthMydata}`

    // create Span TO Bullits
    for ( i = 0; i < lengthMydata; i++) {

        //Create Span
        let span = document.createElement('span');

        //add class 
        if ( i === 0) {
            span.className = 'on';
        }
        spanToBullits.appendChild(span);
    }
    //call Function Add Data
    addQuestionsData(myData[currentindex], lengthMydata)

    //count Down
    countDowen(120, lengthMydata);

    //Click On Submet
    button.onclick = function () {
        let answerReight = myData[currentindex].right_answer;
        currentindex++;
        // Function Compare answer Reight With Cheked Answer
        chekedAnswer(answerReight,lengthMydata);

        // remove old questions
        let divQuestion = document.querySelector('.question');
        divQuestion.innerHTML = '';
        answerErea.innerHTML = '';

        //call Function Add Data
        addQuestionsData(myData[currentindex], lengthMydata)

        //Time Down
        clearInterval(timeDownIntirval);
        countDowen(120, lengthMydata);

        //Handle Bullits
        handleBullits();

        //Showe Result
        sohweResult(lengthMydata);

    }
})

//add Questions Data
function addQuestionsData(obj, count) {
    if (currentindex < count) {
         // Get div Question
         let divQuestion = document.querySelector('.question');
        divQuestion.textContent = obj['title'];

        // loop to create Answer Div
        for ( i = 1; i <= 4; i++) {
            //ceate div
            let divAnswer = document.createElement('div');
            //add class
            divAnswer.className = 'answer';
            //cretae input
            let inputRadio = document.createElement('input');
            inputRadio.name = 'qusetion';
            inputRadio.type = 'radio';
            inputRadio.id = `answer_${i}`;
            inputRadio.dataset.answer = obj[`answer_${i}`];
            //First Option Selecte Cheked
            if ( i === 1) {
                inputRadio.checked = true;
            };
            //create lable
            let label = document.createElement('label');
            // lable.className = 'answer';
            label.htmlFor = `answer_${i}`;
            let lablContent = document.createTextNode(obj[`answer_${i}`]);
            label.appendChild(lablContent);
            //add for to lable
            divAnswer.appendChild(inputRadio)
            divAnswer.appendChild(label)
            answerErea.appendChild(divAnswer)
        };
    }
};

//cheked Answer
function chekedAnswer(answerReight, count) {
    let allInput = document.getElementsByName("qusetion");
    for ( i = 0; i < allInput.length; i++) {

        if (allInput[i].checked) {

            let checkedAnswer = allInput[i].dataset.answer;

            if (checkedAnswer === answerReight) {
                reightAnswer++;
            } else {
                wrongAnswer++;
            };

        };
    };
};


//Handle Bullits
function handleBullits() {
let bullitsSpan = document.querySelectorAll('.span-bullits-and-time .span span');
let arrayFromBullitsSpan = Array.from(bullitsSpan);

arrayFromBullitsSpan.forEach((span, index) => {
    if (index === currentindex) {
        span.className = 'on';
        }
    })
}

// show result
function sohweResult(count) {
    if (currentindex === count) {
        question.remove();
        answerErea.remove();
        button.remove();
        spanToBullits.remove();

        result.style.display = "block";

        let theResult;
        if ( reightAnswer > (count/2) && reightAnswer < count) {
            theResult = `<span class = "good">Good</span> ${reightAnswer} From ${count}`;
        } else if ( reightAnswer === count) {
            theResult = `<span class = "perfect">Perfect</span> All Answer Is Reight`;
        } else {
            theResult = `<span class = "bad">Bad</span> ${reightAnswer} From ${count}`;
        }
        result.innerHTML = theResult;
    }
}

//Time Down 
function countDowen(duration,count) {
    if (currentindex < count) {
        let minutes, sec;
        timeDownIntirval = setInterval(function() {
            minutes = parseInt( duration / 60);
            sec = parseInt( duration % 60);

            minutes = minutes < 10 ? `0${minutes}`: minutes ;
            sec = sec < 10 ? `0${sec}`: sec ;

            timeDown.innerHTML = `${minutes} : ${sec}`;

            if (--duration < 0) {
                clearInterval(timeDownIntirval);
                button.click();
            }
        }, 1000);
    };
};
