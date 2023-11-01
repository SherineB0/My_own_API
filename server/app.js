const express = require('express')
const cors = require('cors')
const instruments= require('./instruments')
const logger = require('./logger.js')
const app = express()
// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello again!')
})
app.get('/instruments', (req, res) => {
  res.send(instruments)
})
app.get('/instruments/:id', (req, res) => {
  const idx = req.params.id
  const instrument= instruments[idx - 1]
  if (!instrument) {
    res.status(404).json({ message: `Instruments with id ${idx} not found` })
  } else {
    res.send(instrument)
  }
})

app.post('/instruments', (req, res) => {
    const instrument = req.body
    const lastInstrument = instruments[instruments.length - 1] // why minus 1? maybe minus 1 bceceause in js the first element would be 0, though its id is 1

    const lastId = lastInstrument ? lastInstrument.id + 1 : 1 // i think this means that if there is another instrument added, then add one to the id, otherwise let it stay like that
    instrument.id = lastId

    instruments.push(instrument) // i think this means to push the last instrument into the instruments list 
    res.status(201).send(instrument)
})

// app.post('/instruments', (req, res) => {
//   // pseudocode
//   // I want to retrieve information from hoppscotch
//   console.log("line 36", req.body)
//   // From info
//   // I want to create a fruit
//   const instrument = req.body
//   // I want to add the fruit to my fruits array
//   instruments.push(instrument)
//   res.status(201).send(instrument)
// })
module.exports = app