const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema ({
    title: { type: String, require: true},
    description: { type: String, require: true},
    date: { type: Date, defaul: Date.now}
})

module.exports = mongoose.model("Note", NoteSchema)