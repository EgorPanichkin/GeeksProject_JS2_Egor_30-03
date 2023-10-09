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

//move block animation

const block = document.querySelector('.child_block')
const widthChildBlock = block.offsetWidth
const widthParentBlock = document.querySelector('.parent_block').offsetWidth
console.log(widthParentBlock)

let leftPosition = 0

function moveBlock(block) {
  if (leftPosition < (widthParentBlock - widthChildBlock)) {
    block.style.left = leftPosition + 'px'
    leftPosition ++ 
    setTimeout(() => {
      moveBlock(block)
    }, 15);
  }
}

moveBlock(block)
