import './../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import Modal from './modules/Modal'

new MobileMenu()
new RevealOnScroll(document.querySelectorAll('.feature'), 75)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60)
new StickyHeader()
new Modal()

if (module.hot) {
  module.hot.accept()
}