const buttons = document.querySelectorAll('[data-test="vote-button"]')

var index = 0

function vote() {
    if (index >= buttons.length) {
        console.log('No more items')
        return
    }
    const button = buttons[index]
    index++
    if (typeof button.lastChild == 'undefined' || typeof button.lastChild.lastChild == 'undefined') {
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
            continue
        }
    }
    button.click()
    setTimeout(vote, 1000)
}

vote()
