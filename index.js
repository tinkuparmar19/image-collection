const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const { MONGOURI } = require('./config/keys')
// const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

// app.use(cors())

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json())

require('./models/user')
require('./models/post')

app.use(require('./routes/user'))
app.use(require('./routes/post'))

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})