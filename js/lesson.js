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