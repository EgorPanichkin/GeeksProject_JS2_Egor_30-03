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

const innerConverter = document.querySelector('.inner_converter')
const inputs = document.querySelectorAll('.input_cash')
const debouncedHandle = debounce(handleInput, 250)
let inputElement

async function handleInput() {
  // const xhr = new XMLHttpRequest()
  // xhr.open('GET', '../data/converter.json')
  // xhr.setRequestHeader('Content-type', 'application/json')
  // xhr.send()
  // xhr.onload = () => {
  //   convertObj = JSON.parse(xhr.response)
  //   console.log(convertObj);
  //   switch (inputElement.id) {
  //     case 'usd':
  //       inputs[0].value = (inputElement.value * convertObj.usd).toFixed(2)
  //       inputs[2].value = (inputElement.value / (convertObj.usd / convertObj.eur)).toFixed(2)
  //       break;
  //     case 'som':
  //       inputs[1].value = (inputElement.value / convertObj.usd).toFixed(2)
  //       inputs[2].value = (inputElement.value / convertObj.eur).toFixed(2)
  //       break;
  //     case 'eur':
  //       inputs[0].value = (inputElement.value * convertObj.eur).toFixed(2)
  //       inputs[1].value = (inputElement.value * (convertObj.usd / convertObj.eur)).toFixed(2)
  //       break;
  //   }
  //   if (inputElement.value === '') {
  //     inputs.forEach((input) => input.value = '')
  //   }
  // }

  // fetch('../data/converter.json')
  //   .then ((response) => response.json())
  //   .then ((data) => {
  //     console.log(data)
  //     switch (inputElement.id) {
  //       case 'usd':
  //         inputs[0].value = (inputElement.value * data.usd).toFixed(2)
  //         inputs[2].value = (inputElement.value / (data.usd / data.eur)).toFixed(2)
  //         break;
  //       case 'som':
  //         inputs[1].value = (inputElement.value / data.usd).toFixed(2)
  //         inputs[2].value = (inputElement.value / data.eur).toFixed(2)
  //         break;
  //       case 'eur':
  //         inputs[0].value = (inputElement.value * data.eur).toFixed(2)
  //         inputs[1].value = (inputElement.value * (data.usd / data.eur)).toFixed(2)
  //         break;
  //     }
  //     if (inputElement.value === '') {
  //       inputs.forEach((input) => input.value = '')
  //     }
  //   })

  try {
    const response = await fetch('../data/converter.json')
    const data = await response.json()
    console.log(data)
    switch (inputElement.id) {
      case 'usd':
        inputs[0].value = (inputElement.value * data.usd).toFixed(2)
        inputs[2].value = (inputElement.value * (data.usd / data.eur)).toFixed(2)
        break;
      case 'som':
        inputs[1].value = (inputElement.value / data.usd).toFixed(2)
        inputs[2].value = (inputElement.value / data.eur).toFixed(2)
        break;
      case 'eur':
        inputs[0].value = (inputElement.value * data.eur).toFixed(2)
        inputs[1].value = (inputElement.value / (data.usd / data.eur)).toFixed(2)
        break;
    }
    if (inputElement.value === '') {
      inputs.forEach((input) => input.value = '')
    }
  } catch (error) {
    console.log("Error: " + error.message);
  }
  
}

innerConverter.addEventListener('input', (event) => {
  inputElement = event.target
  debouncedHandle()
})


// Card Switcher
const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
let id = 1

sendFetchResponse()

btnNext.onclick = () => {
  id = (id % 200) + 1
  sendFetchResponse()
}

btnPrev.onclick = () => {
  id = ((id + 198) % 200) + 1
  sendFetchResponse()
}


function sendFetchResponse() {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => response.json())
    .then(data => {
      card.innerHTML = `
        <p>${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
      `
    })
}

fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then(response => response.json())
  .then(data => console.log(data))

// Weather
const cityNameInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
let searchingCity

cityNameInput.oninput = (event) => {
  searchingCity = event.target.value
  debounceCityInput()
}


function citySearch() {
  fetch(`${BASE_URL}?q=${searchingCity}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      city.innerHTML = data?.name ? data?.name : 'Город не найден...'
      temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
    })
}

const debounceCityInput = debounce(citySearch, 500)

// Debounce
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