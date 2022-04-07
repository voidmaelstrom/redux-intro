// DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plus-5')

const subFiveBtn = document.getElementById('minus-5')

const customBtn = document.getElementById('custom')
const oddBtn = document.getElementById('odd')
const asyncBtn = document.getElementById('async')


// initial state value
const initialState = {
  value: 0,
  otherVal: ''
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/incremented-5':
            return { value : state.value + 5 }
        case 'counter/decremented-5':
            return { value : state.value - 5 }
        case 'counter/custom':
            return {value: state.value + action.payload}
        default:
        return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

const addFiveAction = {
  type: 'counter/incremented-5'
}

const subFiveAction = {
  type: 'counter/decremented-5'
}

const customAction = () => {
    let payload = Number(document.getElementById('userInput').value)
    store.dispatch({
        type: 'counter/custom',
        payload: payload
    })
}

const asyncAction = () => {
    setTimeout(() => {
        store.dispatch({type: 'counter/incremented'})
    }, 1000)
}

const oddAction = () => {
    if(store.getState().value % 2 !== 0) {
        store.dispatch({type: 'counter/incremented'})
    }
}

// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
  store.dispatch(addAction)
}

const subOne = () => {
  store.dispatch(subAction)
}

const addFive = () => {
  store.dispatch(addFiveAction)
}

const subFive = () => {
  store.dispatch(subFiveAction)
}

// event listeners
plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', subOne)
plusFiveBtn.addEventListener('click', addFive)
subFiveBtn.addEventListener('click', subFive)
customBtn.addEventListener('click', customAction)
asyncBtn.addEventListener('click', asyncAction)
oddBtn.addEventListener('click', oddAction)

// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)