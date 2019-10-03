const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types:ObjectId} = Schema;
const commentSchema = new Schema({
    commenter:{// noSQL이라서 관계가 따로 없다. 사용자 아이디를 넣어주자.
        type:ObjectId,  //이 ObjectId는 위의 const {Types:ObjectId} = Schema;에서 나온다.
        required:true,
        ref:'User',
    },
    comment:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
//_id, 작성자, 댓글내용, 생성일
module.exports = mongoose.model('Comment',commentSchema);