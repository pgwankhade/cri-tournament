const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://tournament:tournament123@tournament.g0eja.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// mongodb://127.0.0.1:27017/tournament

// mongodb+srv://tournament:tournament123@tournament.g0eja.mongodb.net/<dbname>?retryWrites=true&w=majority