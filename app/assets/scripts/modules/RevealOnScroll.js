import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
  
  constructor (elements, threshold) {
    this.itemsToReveal = elements
    this.threshold = threshold
    this.hideInitially()
    this.revealElements = throttle(this.calcCaller, 200).bind(this)
    this.browserHeight = window.innerHeight
    this.events()
  }

  events () {
    window.addEventListener('scroll', this.revealElements)
    window.addEventListener('resize', debounce(() => {
      this.browserHeight = window.innerHeight
    }, 333))
  }

  calcCaller () {
    console.log('scroll function ran')
    this.itemsToReveal.forEach(cur => {
      if (cur.isRevealed == false) {
        this.calculateIfScrolledTo(cur)
      }    
    })
  }

  hideInitially () {
    this.itemsToReveal.forEach(cur => {
      cur.classList.add('reveal-item')
      cur.isRevealed = false
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
  }

  calculateIfScrolledTo (el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      console.log('elements was calculated')
      let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100
      if (scrollPercent < this.threshold) {
        el.classList.add('reveal-item--is-visible')
        el.isRevealed = true
        if (el.isLastItem == true) {
          window.removeEventListener('scroll', this.revealElements)
        }
      }
    }
  }

}

export default RevealOnScroll