const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
    room: { //채팅방 아이디 - Room스키마와 연결하여 Room컬렉션의 ObjectId가 들어가게 함.
        type: ObjectId,
        required: true,
        ref: 'Room',
    },
    user: { //채팅을 한 사람
        type: String,
        required: true,
    },
    chat: String, //채팅내역
    gif: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat',chatSchema);