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