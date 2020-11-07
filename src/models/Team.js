const mongoose = require('mongoose')
const validator = require('validator')

const Team = mongoose.model('Team', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    points:{
        type: Number,
        default: 0
    }
})

module.exports = Team