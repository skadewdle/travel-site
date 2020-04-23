import './../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'

new MobileMenu()
new RevealOnScroll(document.querySelectorAll('.feature'), 75)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60)

if (module.hot) {
  module.hot.accept()
}