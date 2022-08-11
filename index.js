const questions = [
    {
        question: "1.Question",
        hulk: "Hulk",
        ironMan: "Iron Man",
        thor: "Thor",
        CaptainAmerica: "Captain America",

    },
    {
        question: "2.Question",
        hulk: "Hulk",
        ironMan: "Iron Man",
        thor: "Thor",
        captainAmerica: "Captain America",
    },
    {
        question: "3.Question",
        hulk: "Hulk",
        ironMan: "Iron Man",
        thor: "Thor",
        captainAmerica: "Captain America",
    }
]
const characterScores = {
    hulk: 0,
    ironMan: 0,
    thor: 0,
    captainAmerica: 0,
}
let questionsLimit = questions.length;
let acceptingAnswers = false;
let questionNo = 0;
const question = document.querySelector('.question')
const options = document.querySelectorAll('.options');
const optionsText = document.querySelectorAll('.options .option_text');
const indicatorProgress = document.querySelector('.indicator_progress');
nextQuestion();
function nextQuestion() {
    for (let i = 0; i < options.length; i++) {
        options[i].firstElementChild.classList.remove('tick')
    }
    question.innerHTML = questions[questionNo].question;
    Object.values(questions[questionNo]).forEach(iterate);
    acceptingAnswers = true;
    options.forEach(option => {
        option.addEventListener('click', choose)
    })
    function choose() {
        if (acceptingAnswers) {
            acceptingAnswers = false;
            for (let i = 0; i < options.length; i++) {
                options[i].firstElementChild.classList.remove('tick')
            }
            this.firstElementChild.classList.add('tick');
            let percentDone = ((questionNo + 1) / questionsLimit) * 100;
            indicatorProgress.style.width = percentDone + '%';
            let char = this.children[1].innerHTML;
            temp = char.replace(/\s+/g, '');
            let camel = temp.charAt(0).toLowerCase() + temp.slice(1);
            console.log(camel);
            characterScores[camel] = characterScores[camel] + 1;
            console.log(characterScores);
            if (questionNo < (questionsLimit - 1)) {
                setTimeout(() => {
                    questionNo++;
                    nextQuestion();
                }, 1000)
            }
            else {
                setTimeout(showResult, 1000)

            }
        }
    }
}
function iterate(item, index) {
    let inn = index - 1;
    if (index > 0) {
        optionsText[inn].innerHTML = item;
    }
}
function showResult() {
    let page = document.querySelector('.page');
    page.parentNode.removeChild(page);
    let max = Object.keys(characterScores).reduce((a, b) => characterScores[a] > characterScores[b] ? a : b);
    let camelCase = max.charAt(0).toLowerCase() + max.slice(1);
    console.log(camelCase);


    let display = document.createElement('div');
    display.classList.add('displayContainer');
    let img = document.createElement('img');
    let path = './images/' + camelCase + '.png';
    img.setAttribute('src', path);

    //show text//

    let div1 = document.createElement('div');
    div1.innerHTML = 'You are';
    let div2 = document.createElement('div');
    let result = max.replace(/([A-Z])/g, " $1");
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    div2.innerHTML = `${finalResult}`
    div2.style.textShadow = "3px 3px #5a5a5a";
    div2.style.fontSize = 'min(4rem,10vw)';

    //show image//

    img.classList.add('winningPicture')
    document.querySelector('body').appendChild(display);
    document.querySelector('body').appendChild(img);
    display.appendChild(div1);
    display.appendChild(div2);
}

