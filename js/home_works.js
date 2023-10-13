// gmail validator

const gmailButton = document.querySelector('#gmail_button')
const gmailInput = document.querySelector('#gmail_input')
const gmailResult = document.querySelector('#gmail_result')

// console.log(gmailButton, gmailInput, gmailResult);

let strLenth = gmailInput.value.lenth

// Имя пользователя может состоять из 6–30 знаков и содержать буквы латинского алфавита (a–z), цифры (0–9) и точки (.)

const regExp = /^[a-zA-Z0-9.]{6,30}@gmail.com$/;

function checkRegExp() {
  if (regExp.test(gmailInput.value)) {
    gmailResult.innerHTML = 'good e-mail'
    gmailResult.style.color = 'green'
  } else {
    gmailResult.innerHTML = 'invalid e-mail adress'
    gmailResult.style.color = 'red'
  }
}

gmailButton.addEventListener('click', () => {
  checkRegExp()
})

gmailInput.addEventListener('keydown', (event) => {
  if (event.code == 'Enter'){
    checkRegExp()
  }
})

// Move block animation

const block = document.querySelector('.child_block')
const widthChildBlock = block.offsetWidth
const widthParentBlock = document.querySelector('.parent_block').offsetWidth
const heightChildBlock = block.offsetHeight
const heightParentBlock = document.querySelector('.parent_block').offsetHeight
console.log(widthParentBlock)

let leftPosition = 0
let topPosition = 0

function moveBlock(block) {
  if (leftPosition <= (widthParentBlock - widthChildBlock-1) && topPosition === 0) {
    block.style.left = leftPosition + 'px'
    leftPosition ++
    // console.log(`left: ${leftPosition}`);
    setTimeout(() => {
      moveBlock(block)
    }, 5);
  } else if (leftPosition === (widthParentBlock - widthChildBlock) && topPosition <= (heightParentBlock - heightChildBlock-1)) {
    block.style.top = topPosition + 'px'
    topPosition ++ 
    // console.log(`top: ${topPosition}`);
    setTimeout(() => {
      moveBlock(block)
    }, 5);
  } else if (leftPosition <= (widthParentBlock - widthChildBlock) && leftPosition >= 1) {
    block.style.left = leftPosition + 'px'
    leftPosition --
    // console.log(`left: ${leftPosition}`);
    setTimeout(() => {
      moveBlock(block)
    }, 5);
  } else if (leftPosition === 0 && topPosition <= (heightParentBlock - heightChildBlock)) {
    block.style.top = topPosition + 'px'
    topPosition --
    // console.log(`top: ${topPosition}`);
    setTimeout(() => {
      moveBlock(block)
    }, 5);
  }
}

moveBlock(block)

// Stopwatch

const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const resetBtn = document.querySelector('#reset')

const timer = document.querySelector('#secondsS')

let time = 0

function startEvent() {
  startBtn.removeEventListener('click', startEvent)
  timer.innerText = time
  return interval = setInterval(() => {
    time++
    timer.innerText = time
  }, 1000)
}

startBtn.addEventListener('click', startEvent)


stopBtn.addEventListener('click', () => {
  startBtn.addEventListener('click', startEvent)
  clearInterval(interval)
})

resetBtn.addEventListener('click', () => {
  clearInterval(interval)
  time = 0
  timer.innerText = time
  startBtn.addEventListener('click', startEvent)
})