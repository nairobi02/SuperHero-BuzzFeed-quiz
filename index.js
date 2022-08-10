const options = document.querySelectorAll('.options');
console.log(options)
options.forEach(option => {
    option.addEventListener('click', choose)
})
function choose() {
    for (let i = 0; i < options.length; i++) {
        options[i].firstElementChild.classList.remove('tick')
    }
    this.firstElementChild.classList.add('tick')
}
