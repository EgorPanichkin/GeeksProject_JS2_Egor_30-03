// Modal

const modalTrigger = document.querySelector('#btn-get')
const modal = document.querySelector('.modal')
const modalCloseBtn = document.querySelector('.modal_close')

modalTrigger.onclick = () => {openModal()}

modal.onclick = (event) => {
  if (event.target === modal || event.target === modalCloseBtn) closeModal()
}

function openModal() {
  modal.style.display = 'block'
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  modal.style.display = 'none'
  document.body.style.overflow = ''
}

// Modal timer

setTimeout(() => {
  openModal()
}, 10000)

// Modal scroll

function modalScrollTrigger() {
  if (scrollY >= document.body.offsetHeight - window.innerHeight-10) {
    console.log('bottom');
    openModal()
    document.removeEventListener('scroll', modalScrollTrigger)
  }
}

document.addEventListener('scroll', modalScrollTrigger)

// POST Request
const form = document.querySelector('form')

async function sendRequest(form) {
  // // Create request
  // const request = new XMLHttpRequest()
  // request.open("POST", "../server.php")
  // request.setRequestHeader('Content-type', 'application/json')

  // // Data processing
  // const formData = new FormData(form)
  // const userObj = {}
  // formData.forEach((element, index) => {
  //   userObj[index] = element
  // })
  // // console.log(userObj)
  // const jsonUser = JSON.stringify(userObj)
  // // console.log('JSON' + jsonUser);

  // // Send request
  // request.send(jsonUser)

  // request.onreadystatechange = () => {
  //   if (request.readyState === 4) {
  //     const requestObj = JSON.parse(request.response)
  //     alert(`${requestObj[0]}, заявка отправлена. Мы вам перезвоним на номер:' ${requestObj[1]}`)
  //   }
  // }
  try {
    const formData = new FormData(form)
    const userObj ={}
    formData.forEach((element, index) => {
      userObj[index] = element
    })
    const response = await fetch('../server.php', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userObj)
    })
    let jsonResp = await response.json()
    alert(`${jsonResp[0]}, заявка отправлена. Мы вам перезвоним на номер: ${jsonResp[1]}`)
  } catch (error) {
    console.log('ERROR');
  }
}

form.addEventListener('submit',(event) => {
  event.preventDefault()
  sendRequest(form)
})