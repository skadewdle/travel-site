import './../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

new MobileMenu()
new RevealOnScroll(document.querySelectorAll('.feature'), 75)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60)
new StickyHeader()
let modal
document.querySelectorAll('.open-modal').forEach(cur => {
  cur.addEventListener('click' ,e => {
    e.preventDefault()
    if (typeof(modal) == 'undefined') {
      import (/* webpackChunkName: "modal" */'./modules/Modal').then(Modal => {
        modal = new Modal.default()
        setTimeout(() => {
          modal.openModal()  
        }, 20);
      }).catch(err => console.log(err))
    }
    else {
      modal.openModal()
    }
  })
})

if (module.hot) {
  module.hot.accept()
}