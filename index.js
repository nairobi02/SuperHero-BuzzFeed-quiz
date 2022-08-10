const questions = [
    {
        question: "1.Question",
        Hulk: "Hulk",
        IronMan: "Iron Man",
        JohnCena: "John Cena",
        CaptainAmerica: "Captain America",

    },
    {
        question: "2.Question",
        Hulk: "Hulk",
        IronMan: "Iron Man",
        JohnCena: "John Cena",
        CaptainAmerica: "Captain America",
    },
    {
        question: "3.Question",
        Hulk: "Hulk",
        IronMan: "Iron Man",
        JohnCena: "John Cena",
        CaptainAmerica: "Captain America",
    }
]
const characterScores = {
    Hulk: 0,
    IronMan: 0,
    JohnCena: 0,
    CaptainAmerica: 0,
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
            characterScores[temp] = characterScores[temp] + 1;
            if (questionNo < (questionsLimit - 1)) {
                setTimeout(() => {
                    console.log(characterScores);
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
    let lotti = document.querySelector('.lotti');
    lotti.parentNode.removeChild(lotti);
    let display = document.createElement('div');
    display.classList.add('displayContainer');
    let div1 = document.createElement('div');
    div1.innerHTML = 'You are';
    let div2 = document.createElement('div');
    let max = Object.keys(characterScores).reduce((a, b) => characterScores[a] > characterScores[b] ? a : b);
    var result = max.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    div2.innerHTML = `${finalResult}`
    let img = document.createElement('img');
    img.setAttribute('src', './images/hulk.png')
    img.classList.add('winningPicture')
    document.querySelector('body').appendChild(display);
    document.querySelector('body').appendChild(img);

    display.appendChild(div1);
    div2.style.fontSize = '4rem';
    display.appendChild(div2);
}

