const mongoose = require('mongoose');

const { Schema } = mongoose;
const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
})