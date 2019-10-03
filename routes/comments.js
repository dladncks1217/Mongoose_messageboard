var express = require('express');
var router = express.Router();
const Comment = require('../schemas/comment');
// GET/comments/:id
router.get('/:id', (req, res, next)=> {
    Comment.find({commenter:req.params.id}) //id가 맞는 사람의 id를 가져와야 하므로 이 조건을 추가해주어야 한다.
        .then((comments)=>{
            res.json(comments);
        })
        .catch((error)=>{
            console.error(error);
            next(error);
        })
});
router.patch('/:id',(req,res,next)=>{  //댓글 수정
    Comment.update({_id:req.params.id},{comment:req.body.comment})  //시퀄라이즈와 인자의 순서가 반대다.
        .then((result)=>{
            res.json(result);
        })
        .catch((error)=>{
            console.error(error);
            next(error);
        })
});
router.delete('/:id',(req,res,next)=>{
    Comment.remove({_id:req.params.id})
        .then((result)=>{
            res.json(result);
        })
        .catch((error)=>{
            console.error(error);
            next(error);
        })
});
router.post('/',(req,res,next)=>{
    const comment = new Comment({
        commenter:req.body.id,
        comment:req.body.comment,
    });
    comment.save()
        .then((result)=>{
            res.status(201).json(result);
        })
        .catch((error)=>{
            console.error(error);
            next(error);
        })
});
module.exports = router;
