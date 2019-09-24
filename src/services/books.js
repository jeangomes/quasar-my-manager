export const create = (axios, book) => axios.post('/api/books', book).then((result) => {
  console.log(result)
})
