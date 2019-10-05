const express = require('express');
const Comment = require('../schemas/comment');
const router = express.Router();

// GET/comments/:id
router.get('/:id', (req, res, next)=> {
    Comment.find({commenter:req.params.id}).populate('commenter') //id가 맞는 사람의 id를 가져와야 하므로 이 조건을 추가해주어야 한다. populate()는 시퀄라이즈의 include 옵션과 비슷하다.
        .then((comments)=>{                                     //mongoose에서 populate 해주는것. mysql의 join과 비슷하다. 물론 mongoose에서 하기 때문에 성능은 떨어짐.
            res.json(comments);
        })
        .catch((error)=>{
            console.error(error);
            next(error);
        });
});
router.patch('/:id',(req,res,next)=>{  //댓글 수정
    Comment.update({_id:req.params.id},{comment:req.body.comment})  //시퀄라이즈와 인자의 순서가 반대다.
        .then((result)=>{
            res.json(result);
        })
        .catch((error)=>{
            console.error(error);
            next(error);
        });
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
        });
});
module.exports = router;
