let obj;
export { obj as default }
const questions = [
    {
        question: "1. WHICH WEAPON WOULD YOU LIKE THE MOST?",
        hulk: "I don't need weapons",
        ironMan: "A Super Suit",
        hawkEye: "Bow and Arrows",
        CaptainAmerica: "A Team",

    },
    {
        question: "2. WHAT MOTIVATES YOU MOST?",
        thor: "To become Righteous",
        ironMan: "Vengence",
        blackWidow: "Discipline keeps me motivated",
        hulk: "To cure",
    },
    {
        question: "3. WHAT DID YOU PLAY WITH WHEN YOU WERE YOUNGER?",
        ironMan: "Computers",
        hulk: "Chemistry set",
        hawkEye: "Slingshot",
        captainAmerica: "There's no time to play when your country is at war",
    },
    // {
    //     question: "4. IT'S LOOKING BAD, AND THE EMENY IS GAINING QUICK...WHAT DO YOU DO?",
    //     hawkEye: "Create a diversion and use it to my advantage",
    //     blackWidow: "Wait for an opportunity, there will be one...",
    //     thor: "Why wait when I can finish all of them",
    //     captainAmerica: "Get the civilians to safety",
    // },
    // {
    //     question: "5. HOW WOULD YOU DESCRIBE YOUR PERSONALITY?",
    //     thor: "Heroic",
    //     captainAmerica: "Noble",
    //     hulk: "Calculated",
    //     blackWidow: "Which personality?",
    // },
    // {
    //     question: "6. CHOOSE AN INFINITY STONE",
    //     ironMan: "Mind Stone",
    //     thor: "Space Stone",
    //     blackWidow: "Reality Stone",
    //     hawkEye: "Soul stone",
    // },
    // {
    //     question: "7. WHICH SKILL DO YOU MOST VALUE?",
    //     blackWidow: "Manipulation",
    //     hawkEye: "Ingenuity",
    //     captainAmerica: "Moral Compass",
    //     ironMan: "Intelligence",
    // },
    // {
    //     question: "8. DESCRIBE YOUR PERSONAL STYLE",
    //     hawkEye: "Combat Ready",
    //     blackWidow: "Formal",
    //     ironMan: "Suits! Always suits!",
    //     captainAmerica: "If you're gonna fight a war, you got to wear a uniform.",
    // },
    // {
    //     question: "9. WHAT IS YOUR BIGGEST STRENGTH?",
    //     thor: "Powers that I was born with",
    //     hulk: "My strength",
    //     ironMan: "My Intelligence",
    //     captainAmerica: "My foresight",
    // },
    // {
    //     question: "10. WHAT ARE YOU AFRAID OF?",
    //     ironMan: "Failure",
    //     hulk: "Myself",
    //     hawkEye: "Losing my family",
    //     blackWidow: "My Past",
    // },
]
const characterScores = {
    hulk: 0,
    ironMan: 0,
    thor: 0,
    captainAmerica: 0,
    blackWidow: 0,
    hawkEye: 0
}
console.log('hello')

let questionsLimit = questions.length;
let acceptingAnswers = false;
let questionNo = 0;
const question = document.querySelector('.question')
const options = document.querySelectorAll('.options');
const optionsText = document.querySelectorAll('.options .option_text');
const indicatorProgress = document.querySelector('.indicator_progress');
let playerName;
let qA = document.querySelector('.q_a')
let page = document.querySelector('.page');
let loader = document.querySelector('.loader'); loader.classList.remove('hidden');
console.log('hello')

nextQuestion();
setTimeout(() => {
    ; loader.classList.add('hidden');
    page.classList.remove('hidden');
    inputShow();
}, 2000)

function inputShow() {

    qA.classList.add('hidden');

    let modal = document.createElement('div');
    modal.classList.add('modal');
    let input = document.createElement('input');
    let button = document.createElement('button');
    button.innerHTML = 'Start Quiz';

    modal.append(input, button);
    page.append(modal);
    function checkInput() {
        if (input.value.length > 0) {
            playerName = input.value;
            modal.remove();
            document.querySelector('.q_a').classList.remove('hidden');
        }
    }
    button.addEventListener('click', checkInput);
}



function nextQuestion() {
    for (let i = 0; i < options.length; i++) {
        options[i].firstElementChild.classList.remove('tick')
    }
    question.innerHTML = questions[questionNo].question;
    Object.values(questions[questionNo]).forEach(iterate1);
    Object.keys(questions[questionNo]).forEach(iterate2);
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



            let char = this.getAttribute('data-id');

            let temp = char.replace(/\s+/g, '');
            let camel = temp.charAt(0).toLowerCase() + temp.slice(1);

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
function iterate1(item, index) {
    let inn = index - 1;
    if (index > 0) {
        optionsText[inn].innerHTML = item;
    }
}
function iterate2(item, index) {
    let inn = index - 1;
    if (index > 0) {
        options[inn].setAttribute('data-id', item);
    }
}
function showResult() {

    let page = document.querySelector('.page');
    page.parentNode.removeChild(page);
    let page2 = document.createElement('div');
    document.body.appendChild(page2);
    page2.classList.add('.page2');


    document.body.style.backgroundColor = '#d93d27'
    document.querySelector('.loader').classList.remove('hidden');



    let max = Object.keys(characterScores).reduce((a, b) => characterScores[a] > characterScores[b] ? a : b);
    let camelCase = max.charAt(0).toLowerCase() + max.slice(1);



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
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
        img.classList.add('winningPicture')
        page2.appendChild(img);
        page2.appendChild(display);
        display.appendChild(div1);
        display.appendChild(div2);
    }, 2500);
    obj = {
        name: playerName,
        result: finalResult
    }
    if (obj) {
        console.log(obj);
        pushTodb();
    }
}

