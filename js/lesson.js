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
        showTabContent(tabIndex)
        // console.log(tabs);
      }
    })
  }
})

// Auto Tab Slider

function autoShow(activeIndex) {
  setInterval(() => {
    if (activeIndex < tabs.length-1) {
      activeIndex++
    } else {
      activeIndex = 0
    }
    hideTabContent()
    showTabContent(activeIndex)
  }, 1000);
}

autoShow(0)