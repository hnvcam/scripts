const buttons = document.querySelectorAll('[data-test="vote-button"]')

var index = 0

function vote() {
    if (index >= buttons.length) {
        console.log('No more products to vote')
        return
    }
    const button = buttons[index]
    index++
    if (typeof button.lastChild === 'undefined' 
        || typeof button.lastChild.lastChild === 'undefined') {
        console.log('Invalid button', button)
        setTimeout(vote, 0)
        return
    }
    const voteCount = parseInt(button.lastChild.lastChild.innerText)
    if (voteCount > 50) {
        console.log(`High vote count ${voteCount}, skip`)
        setTimeout(vote, 0)
        return
    }
    const classes = button.classList
    for (const className of classes) {
        if (className.search('upvoted') > 0) {
            console.log('voted, skip')
            setTimeout(vote, 0)
            return
        }
    }
    button.click()
    console.log('voted')
    setTimeout(vote, 2000)
}

var lastY = 0
function scrollForMore() {
    if (lastY === document.body.scrollHeight) {
        console.log('No more items to load. Start voting...')
        vote()
        return
    }
    lastY = document.body.scrollHeight
    window.scrollTo(0, document.body.scrollHeight)
    setTimeout(scrollForMore, 5000)
}

scrollForMore()
