var quiz;
var quizNoun;
var quizQuantifiers;
var quizAccommodation;
var quizCountries;
var quizDaily;
var quizHave;
var quizIndirect;
var quizJob;
var quizMixed;
var quizModal;
var quizPossessive;
var quizTag;
var quizReported;
var quizSingular;
var quizSpeculation;
var quizSubject;
var quizThis;
var quizTime;
var quizTobe;
var quizWishes;
var quizT1;
var quizT2;


function showResults(activeQuiz) {
    quiz = activeQuiz;
    // Check answers and continue if all questions have been answered
    if (quiz.checkAnswers()) {
        var quizScorePercent = quiz.result.scorePercentFormatted; // The unformatted percentage is a decimal in range 0 - 1
        var quizResultElement = document.getElementById('quiz-result');
        quizResultElement.style.display = 'block';
        document.getElementById('quiz-score').innerHTML = quiz.result.score.toString();
        document.getElementById('quiz-max-score').innerHTML = quiz.result.totalQuestions.toString();
        document.getElementById('quiz-percent').innerHTML = quizScorePercent.toString();

        // Change background colour of results div according to score percent
        if (quizScorePercent >= 75) quizResultElement.style.backgroundColor = '#4caf50';
        else if (quizScorePercent >= 50) quizResultElement.style.backgroundColor = '#ffc107';
        else if (quizScorePercent >= 25) quizResultElement.style.backgroundColor = '#ff9800';
        else if (quizScorePercent >= 0) quizResultElement.style.backgroundColor = '#f44336';

        // Highlight questions according to whether they were correctly answered. The callback allows us to highlight/show the correct answer
        quiz.highlightResults(handleAnswers);
    }
}

/** Callback for Quiz.highlightResults. Highlights the correct answers of incorrectly answered questions 
 * Parameters are: the quiz object, the question element, question number, correctly answered flag
 */
function handleAnswers(quiz, question, no, correct) {
    if (!correct) {
        var answers = question.getElementsByTagName('input');
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].type === "checkbox" || answers[i].type === "radio") {
                // If the current input element is part of the correct answer, highlight it
                if (quiz.answers[no].indexOf(answers[i].value) > -1) {
                    answers[i].parentNode.classList.add(Quiz.Classes.CORRECT);
                }
            } else {
                // If the input is anything other than a checkbox or radio button, show the correct answer next to the element
                var correctAnswer = document.createElement('span');
                correctAnswer.classList.add(Quiz.Classes.CORRECT);
                correctAnswer.classList.add(Quiz.Classes.TEMP); // quiz.checkAnswers will automatically remove elements with the temp class
                correctAnswer.innerHTML = quiz.answers[no];
                correctAnswer.style.marginLeft = '10px';
                answers[i].parentNode.insertBefore(correctAnswer, answers[i].nextSibling);
            }
        }
    }
}
window.onload = function () {
    // Load the quizzes that exist on the page.
    if (document.getElementById("quiz-noun") != null) {
        quizNoun = new Quiz('quiz-noun', [
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
            'a',
        ]);
    }

    if (document.getElementById("quiz-quantifiers") != null) {
        quizQuantifiers = new Quiz('quiz-quantifiers', [
            'a',
            'b',
            'b',
            'c',
            'a',
            'a',
            'a',
            'a',
            'c',
            'b',
        ]);
    }

    if (document.getElementById("quiz-accommodation") != null) {
        quizAccommodation = new Quiz('quiz-accommodation', [
            'b',
            'c',
            'a',
            'a',
            'b',
            'b',
            'a',
            'c',
            'c',
            'b',
        ]);
    }

    if (document.getElementById("quiz-countries") != null) {
        quizCountries = new Quiz('quiz-countries', [
            'd',
            'a',
            'a',
            'b',
            'a',
            'c',
            'c',
            'd',
            'a',
            'b',
        ]);
    }

    if (document.getElementById("quiz-daily") != null) {
        quizDaily = new Quiz('quiz-daily', [
            'a',
            'b',
            'b',
            'b',
            'b',
            'c',
            'a',
            'a',
            'b',
            'a',
        ]);
    }

    if (document.getElementById("quiz-have") != null) {
        quizHave = new Quiz('quiz-have', [
            'b',
            'd',
            'a',
            'a',
            'c',
            'd',
            'a',
            'a',
            'd',
            'a',
        ]);
    }

    if (document.getElementById("quiz-indirect") != null) {
        quizIndirect = new Quiz('quiz-indirect', [
            'a',
            'a',
            'c',
            'a',
            'a',
            'c',
            'a',
            'a',
            'c',
            'b',
        ]);
    }

    if (document.getElementById("quiz-job") != null) {
        quizJob = new Quiz('quiz-job', [
            'b',
            'b',
            'a',
            'c',
            'b',
            'b',
            'b',
            'a',
            'b',
            'a',
        ]);
    }

    if (document.getElementById("quiz-mixed") != null) {
        quizMixed = new Quiz('quiz-mixed', [
            'b',
            'd',
            'b',
            'a',
            'd',
            'a',
            'a',
            'a',
            'c',
            'b',
        ]);
    }

    if (document.getElementById("quiz-modal") != null) {
        quizModal = new Quiz('quiz-modal', [
            'c',
            'b',
            'b',
            'c',
            'a',
            'c',
            'b',
            'c',
            'b',
            'a',
        ]);
    }

    if (document.getElementById("quiz-possessive") != null) {
        quizPossessive = new Quiz('quiz-possessive', [
            'a',
            'a',
            'a',
            'b',
            'b',
            'b',
            'a',
            'b',
            'a',
            'a',
        ]);
    }

    if (document.getElementById("quiz-tag") != null) {
        quizTag = new Quiz('quiz-tag', [
            'isnt he',
            'is it',
            'arent you',
            'didnt she',
            'did he',
            'dont they',
            'hasnt he',
            'isnt it',
            'will he',
            'didnt he',
        ]);
    }

    if (document.getElementById("quiz-reported") != null) {
        quizReported = new Quiz('quiz-reported', [
            'd send',
            'd bought',
            'didnt speak',
            'd failed',
            'he couldnt',
            'looked',
            'were going',
            'werent listening',
            'she said that he worked in a bank',
            'she said that they had gone out last night',
        ]);
    }

    if (document.getElementById("quiz-singular") != null) {
        quizSingular = new Quiz('quiz-singular', [
            'a',
            'an',
            'an',
            'a',
            'a',
            'an',
            'an',
            'a',
            'an',
            'an',
        ]);
    }

    if (document.getElementById("quiz-speculation") != null) {
        quizSpeculation = new Quiz('quiz-speculation', [
            'a',
            'a',
            'd',
            'a',
            'b',
            'b',
            'b',
            'd',
            'b',
            'c',
        ]);
    }

    if (document.getElementById("quiz-subject") != null) {
        quizSubject = new Quiz('quiz-subject', [
            'your',
            'my',
            'I',
            'she',
            'yours',
            'mine',
            'c',
            'd',
            'a',
            'b',
        ]);
    }

    if (document.getElementById("quiz-this") != null) {
        quizThis = new Quiz('quiz-this', [
            'a',
            'c',
            'b',
            'a',
            'c',
            'b',
            'c',
            'b',
            'd',
            'a',
        ]);
    }

    if (document.getElementById("quiz-time") != null) {
        quizTime = new Quiz('quiz-time', [
            'although',
            'because',
            'so',
            'although',
            'because',
        ]);
    }

    if (document.getElementById("quiz-tobe") != null) {
        quizTobe = new Quiz('quiz-tobe', [
            'b',
            'a',
            'c',
            'b',
            'b',
            'c',
            'b',
            'a',
            'c',
            'b',
        ]);
    }

    if (document.getElementById("quiz-wishes") != null) {
        quizWishes = new Quiz('quiz-wishes', [
            'd',
            'c',
            'a',
            'd',
            'c',
            'd',
            'a',
            'b',
            'a',
            'a',
        ]);
    }

    if (document.getElementById("quiz-t2") != null) {
        quizT2 = new Quiz('quiz-t2', [
            'd',
            'c',
            'a',
            
        ]);
    }

    if (document.getElementById("quiz-t1") != null) {
        quizT1 = new Quiz('quiz-t1', [
            'd',
            'c',
            'a',
           
        ]);
    }


};

