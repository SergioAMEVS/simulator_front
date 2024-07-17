// require('dotenv').config()
// const express = require('express')
// const path = require('path')
// const app = express()

// app.use(process.env.BASE_URL + '/', express.static(path.join(__dirname, 'dist')))

// app.listen(4173, () => {
//   console.log('url:' + process.env.BASE_URL + '/')
//   console.log('App listening on port 4173')
// })

require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()

// Serve static files from the 'dist' directory
app.use(process.env.BASE_URL, express.static(path.join(__dirname, 'dist')))

// Add this catch-all route handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(4173, () => {
  console.log('url:' + process.env.BASE_URL)
  console.log('App listening on port 4173')
})
