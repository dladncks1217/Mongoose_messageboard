var express = require('express');
var router = express.Router();
const User = require('../schemas/user');
/* GET home page. */
router.get('/', (req, res, next)=> {
    User.find()
        .then((users)=>{  //몽구스도 promise 지원.
            res.json(users);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});
router.post('/',(req,res,next)=>{
    const user = new User({    //mongoose에서 새로운 document를 생성하는 방법 (시퀄라이즈에서는 create.user)
       name: req.body.name,
        age:req.body.age,
        married:req.body.married,
    });
    user.save()
        .then((result)=>{
            res.status(201).json(result);
        })
        .catch((error)=>{
         console.error(error);
         next(error);
    });
});
module.exports = router;
