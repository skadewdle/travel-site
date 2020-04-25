import './../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import ClientArea from './modules/ClientArea'
import React from 'react'
import ReactDOM from 'react-dom'
import MyAmazingComponent from './modules/MyAmazingComponent'
// React related code goes here

ReactDOM.render(<MyAmazingComponent />, document.querySelector('#my-react-example'))

new ClientArea()
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