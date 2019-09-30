const mongoose = require('mongoose');

const {Schema} = mongoose;
const userSchema = new Schema({
    name:{
        type:String,     //JS의 String 객체를 그대로 사용한다.
        required:true,     //sequelize 에서 allowNull말하는것.
        unique:true,
    },
    age:{
        type:Number,
        required:true,
    },
    married:{
        type:Boolean,
        required:true,
    },
    comment:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
//_id 이름 나이 결혼여부 생성일
module.exports = mongoose.model('User',userSchema);
//이런 식으로 정의하면 MongoDB지만 Mysql처럼 틀에 맞는 데이터들만 들어간다.
//type: 자료형, required: 필수 여부, unique: 고유 여부, default: 기본값