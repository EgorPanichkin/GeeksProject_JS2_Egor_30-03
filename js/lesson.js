// Phone checker

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')
const phoneSelect = document.querySelector('#phone-selector')

let regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneSelect.addEventListener('change',() => {
  phoneInput.value = null
  switch (phoneSelect.value) {
    case ('1'):
      console.log('kgz')
      phoneInput.placeholder = '+996 XXX XX-XX-XX'
      regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
      break;
    case ('2'):
      console.log('rus')
      phoneInput.placeholder = '+7 XXX XXX-XX-XX'
      regExp = /^\+7 [9]\d{2} \d{3}-\d{2}-\d{2}$/
      break;
    case ('3'):
      console.log('usa')
      phoneInput.placeholder = '+1 XXX-XXX-XXXX'
      regExp = /^\+1 [2-9]\d{2}-\d{3}-\d{4}$/
      break;
}
})

phoneButton.addEventListener('click', () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = 'OK'
    phoneResult.style.color = 'green'
  } else {
    phoneResult.innerHTML = 'NOT OK'
    phoneResult.style.color = 'red'
  }
})



// Tab slider

const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')
let activeTab = 0

function hideTabContent() {
  tabContent.forEach((tabBlock) => {
    tabBlock.style.display = 'none'
  })
  tabs.forEach((tabItem) => {
    tabItem.classList.remove('tab_content_item_active')
  })
}

function showTabContent(indexElemrnt = 0) {
  tabContent[indexElemrnt].style.display = 'block'
  tabs[indexElemrnt].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent(0)

tabsParent.addEventListener('click', (event) => {
  if (event.target.classList.contains('tab_content_item')){
    tabs.forEach((tabItem, tabIndex) => {
      if (event.target === tabItem) {
        hideTabContent()
        activeTab = tabIndex
        showTabContent(tabIndex)
      }
    })
  }
})

// Auto Tab Slider

function autoShow() {
  hideTabContent()
  activeTab = (activeTab + 1) % tabs.length
  showTabContent(activeTab)
}

setInterval(() => {autoShow()}, 2000);

// Converter

// const somInput = document.querySelector('#som')
// const usdInput = document.querySelector('#usd')
// let convertObj

// function converterChanges(elementValue, targetElement, isTrue) {
//   elementValue.oninput = () => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', '../data/converter.json')
//     xhr.setRequestHeader('Content-type', 'application/json')
//     xhr.send()
//     xhr.onload = () => {
//       convertObj = JSON.parse(xhr.response)
//       if (isTrue) {
//         targetElement.value = (elementValue.value / convertObj.usd).toFixed(2)
//       } else {
//         targetElement.value = (elementValue.value * convertObj.usd).toFixed(2)
//       }
//       elementValue.value === '' && (targetElement.value = '')
//     }
//   }
// }


// converterChanges(somInput, usdInput, true)
// converterChanges(usdInput, somInput, false)

const innerConverter = document.querySelector('.inner_converter')
const inputs = document.querySelectorAll('.input_cash')
const debouncedHandle = debounce(handleInput, 250)
let inputElement

function handleInput() {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', '../data/converter.json')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send()
  xhr.onload = () => {
    convertObj = JSON.parse(xhr.response)
    console.log(convertObj);
    switch (inputElement.id) {
      case 'usd':
        inputs[0].value = (inputElement.value * convertObj.usd).toFixed(2)
        inputs[2].value = (inputElement.value / (convertObj.usd / convertObj.eur)).toFixed(2)
        break;
      case 'som':
        inputs[1].value = (inputElement.value / convertObj.usd).toFixed(2)
        inputs[2].value = (inputElement.value / convertObj.eur).toFixed(2)
        break;
      case 'eur':
        inputs[0].value = (inputElement.value * convertObj.eur).toFixed(2)
        inputs[1].value = (inputElement.value * (convertObj.usd / convertObj.eur)).toFixed(2)
        break;
    }
    if (inputElement.value === '') {
      inputs.forEach((input) => input.value = '')
    }
  }
}

innerConverter.addEventListener('input', (event) => {
  inputElement = event.target
  debouncedHandle()
})

function debounce(callee, timeoutMs) {
  return function perform(...args) {
    let previousCall = this.lastCall
    this.lastCall = Date.now()
    if (previousCall && this.lastCall - previousCall <= timeoutMs) {
      clearTimeout(this.lastCallTimer)
    }
    this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
  }
}