import { useState } from 'react'

let unFocusTimeout = null

/**
 * Custom hook that allows for focus to prevail over blur when called simultaneously
 * Note, timeout technique is a mess but only realistic way to implement, taken from
 * https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b
 * @param {boolean} defaultFocus determines initial focus
 * @param {int} delay determines delay
 */
export default function useDelayedBlur(defaultFocus = false, delay = 150) {
    const [focus, setFocus] = useState(defaultFocus)

    const doFocus = (e) => {
        setFocus(true)
        if (unFocusTimeout) window.clearTimeout(unFocusTimeout)
    }

    const doBlur = (e) => {
        unFocusTimeout = window.setTimeout(() => {
            setFocus(false)
        }, delay)
    }

    return [focus, doFocus, doBlur]
}
