const startlink = document.querySelector('#start')
const screenEl = document.querySelectorAll('.screen')
const timelist = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let timer 
let score = 0


startlink.addEventListener('click', (event) => {
    event.preventDefault();
    screenEl[0].classList.add('up')
})

timelist.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time')) 
        screenEl[1].classList.add('up')
        startGame();
    }
})

function startGame(){
    score = 0
    setTime(time)
    timer = setInterval(gettime, 1000)
    createRandomCircle ()
}

function gettime(){
    if(time === 0){
        stopGame();
    } else {
        let current = --time
        setTime(current)
    }
}

function setTime(value){
    value < 10 && (value = `0${value}`)
    timeEl.innerHTML = `00:${value}`
}
function stopGame() {
    timeEl.parentElement.classList.add('hide') 
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`
    const repeatbtn = document.createElement('div')
    repeatbtn.classList.add('time-btn')
    repeatbtn.innerHTML = 'Повторить'
    repeatbtn.addEventListener('click', () => {
        startAgain();
    })
    board.append(repeatbtn)
    clearInterval(timer);
}

function createRandomCircle () {
    const size = getRandomNumber(10, 60);
    const {width: x, height:y} = board.getBoundingClientRect()
    const circle = document.createElement('div');
    circle.classList.add('circle')
    circle.style.boxShadow = `0 0 10px ${getRandomColor()}`
    circle.style.backgroundColor = getRandomColor()
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${getRandomNumber(0,y-size-10)}px`
    circle.style.left = `${getRandomNumber(0,x-size-10)}px`
    circle.addEventListener('click', event => {
        score++
        circle.remove()
        createRandomCircle()
    })
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.random() * (max-min) + min
}
function getRandomColor() {
    const R = Math.floor(Math.random()*16).toString(16)
    const G = Math.floor(Math.random()*16).toString(16)
    const B = Math.floor(Math.random()*16).toString(16)
    return `#${R}${G}${B}`
}

function startAgain() {
    screenEl[1].classList.remove('up')
    board.innerHTML = ""
    timeEl.parentElement.classList.remove('hide')
}
