const express = require('express')
const app = express()

//should create a http server with port "3551"
//creating http server does not currently work
const port = 3551

app.listen(port, () => {
    console.log(`Arcane Backend listening on port ${port}`)
})
