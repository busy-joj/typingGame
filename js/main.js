const wordInput = document.querySelector("#word-input")
const currentWord = document.querySelector("#current-word")
const timeDisplay = document.querySelector("#time")
const scoreDisplay = document.querySelector("#score")
const messageDisplay = document.querySelector("#message")

const GAME_TIME = 5;

const API_URL = "https://random-word-api.herokuapp.com/all"

let words = ['banana', 'key', 'car', 'javascript', 'joj']
let score = 0;
let time = 0;
let timeInterval
let isPlaying = false
let isReady = false
init()
//fatch 사용
// function init() {
//     const res = fetch(API_URL).then(res => res.json()).then((data) => words = data)
// }

//async await 사용
async function init() {
    const res = await fetch(API_URL);
    const data = await res.json()
    words = data.filter(item => item.length < 8)
    isReady = true
    alert('문제 준비가 완료 되었습니다:) 시작해봅시다!!')
}

wordInput.addEventListener('input', e => {
    const typedText = e.target.value
    const currentText = currentWord.innerText
    console.log(typedText, currentText)
    if (typedText.toUpperCase() === currentText.toUpperCase() && isReady) {
        addScore()
        setNewWord()
    }
})

function conutDown() {
    time = time - 1
    timeDisplay.innerText = time
    if (time === 0) {
        gameover()
    }
}

function gameover() {
    isPlaying = false
    clearInterval(timeInterval)
    timeInterval = null
    messageDisplay.innerText = "GAME OVER :("
    score = 0
}

function setNewWord() {
    time = GAME_TIME
    timeDisplay.innerText = time
    wordInput.value = ""
    messageDisplay.innerText = "Now Playing!!!"
    const randomIndex = Math.floor(Math.random() * words.length)
    currentWord.innerText = words[randomIndex]

    if (!isPlaying) {
        timeInterval = setInterval(conutDown, 1000)
        isPlaying = true
    }

}
function addScore() {
    score = score + 1
    scoreDisplay.innerText = score
}