const express = require('express');
const User = require('../schemas/user');  //mongoose 는 sequelize 와 다르게 모델을 직접 스키마에서 가져온다.(index 에서 안가져옴.)

const router = express.Router();
/* GET home page. */
router.get('/', (req, res, next)=> {
    User.find({})    //몽구스는 모두 가져오는게 find()이다. (시퀄라이즈는 findAll)
        .then((users)=>{  //몽구스도 promise 지원.
            res.render('mongoose',{users});
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});
module.exports = router;

