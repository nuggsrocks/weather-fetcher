const change = (value) => ({
  type: 'CHANGE',
  value
})

const reducer = (state = '', action = { type: '', value: '' }) => {
  if (action.type === 'CHANGE') {
    return action.value
  } else {
    return state
  }
}

export { change, reducer }
