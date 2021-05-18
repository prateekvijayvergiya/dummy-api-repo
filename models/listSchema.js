const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema({
    task: {
        type: String
    },
    status : Boolean
})

var Todo = mongoose.model('tasks', todoSchema)

module.exports = Todo