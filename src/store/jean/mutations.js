export function someMutation (state, payload) {
  console.log('mut', state)
  console.log('mut', payload)
  state.book = payload
}
