const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
    bookCount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        default: 0
    }
});

module.exports = mongoose.model('Author', authorSchema); 