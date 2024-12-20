var buttons
var index = 0
var lastY = 0
var reachedEndCount = 0

function vote() {
    if (index >= buttons.length) {
        console.log('No more products to vote')
        return
    }
    const button = buttons[index]
    button.scrollIntoView()
    index++
    if (typeof button.lastChild === 'undefined' 
        || typeof button.lastChild.lastChild === 'undefined') {
        console.log('Invalid button', button)
        setTimeout(vote, 0)
        return
    }
    const textDiv = button.lastChild.lastChild
    const voteCount = parseInt(textDiv.innerText.replaceAll(',',''))
    if (voteCount > 50) {
        console.log(`High vote count ${voteCount}, skip`)
        setTimeout(vote, 0)
        return
    }
    
    const classes = textDiv.classList
    for (const className of classes) {
        if (className.search('text-brand-500') >= 0) {
            console.log('voted, skip')
            setTimeout(vote, 0)
            return
        }
    }
    button.firstChild.click()
    console.log('voted')
    setTimeout(vote, 2000)
}

function scrollForMore() {
    if (lastY === document.body.scrollHeight) {
        /// Waiting for long loading
        if (reachedEndCount < 3) {
            console.log('Reached end for', reachedEndCount, 'times')
            reachedEndCount++
            setTimeout(scrollForMore, 5000)
            return
        }
        
        buttons = document.querySelectorAll('[data-test="vote-button"]')
        console.log('No more items to load. Start voting for', buttons.length, 'products')
        setTimeout(vote, 1000)
        return
    }
    // reset counter if loading successfully
    reachedEndCount = 0
    lastY = document.body.scrollHeight
    window.scrollTo(0, document.body.scrollHeight)
    console.log('still scrolling...')
    setTimeout(scrollForMore, 5000)
}

scrollForMore()
