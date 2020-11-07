const express = require('express')
require('./src/db/mongoose')
const teamRouter = require('./src/router/Team')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(teamRouter)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})