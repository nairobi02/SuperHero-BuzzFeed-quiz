//advt use here
//
let obj = import('./quiz/index.js');
let ID = setInterval(function () {
    if (!obj === undefined) {
        clearInterval(ID);
        console.log(obj)
    }
    else {
        console.log('waiting')
    }
}, 1000);


//pull existing from db and display if any