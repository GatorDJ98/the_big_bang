

const express = require('express')
const app = express()
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the future Location of WhereAt!')
})

console.log('in the node console');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})