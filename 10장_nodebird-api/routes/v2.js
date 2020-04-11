const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const url = require('url');

const { verifyToken, apiLimiter } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

//router.use(cors()); 모든 도메인의 접근 허용 > 보안  위험
router.use(async(req, res ,next)=>{
    const domain = await Domain.findOne({
        where: { host: url.parse(req.get('origin')).host} //요청 보낸 도메인 비교하게 함
    });
    if(domain){
        cors({origin: req.get('origin')})(req,res,next);
    }else{
        next();
    }
});

//router.use(cors())
//router.use((req,res,next)=>{ //둘이 같은 거임!
//    cors()(req,res,next);
//});

router.post('/token', apiLimiter, async (req, res)=>{
    const { clientSecret } = req.body;
    try{
        const domain = await Domain.findOne({
            where: { clientSecret },
            include: {
                model: User,
                attribute: ['nick','id'],
            },
        });
        console.log(domain);
        if(!domain){
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다'
            });
        }
        const token = jwt.sign({
            id: domain.user.id,
            nick: domain.user.nick,
        }, process.env.JWT_SECRET, {
            expiresIn: '30m',//30분
            issuer: 'nodebird',
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다.',
            token,
        });
    } catch(error){
        console.error(error);
        res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.get('/test', verifyToken, apiLimiter, (req,res)=>{
    res.json(req.decoded);
});

router.get('/posts/my', verifyToken,apiLimiter, async (req, res)=>{
    try {
        const posts = await Post.findAll({where: {userId: req.decoded.id}});
        res.json({
            code: 200,
            payload: posts,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.get('/posts/hashtag/:title', verifyToken, apiLimiter,async(req, res)=>{
    try{
        const hashtag = await Hashtag.findOne({where: {title: req.params.title}});
        if(!hashtag){
            return res.status(404).json({
                code: 404,
                message: '검색 결과가 없습니다',
            });
        }
        const posts = await hashtag.getPosts();
        return res.json({
            code: 200,
            payload: posts,
        });
    }catch (e) {
        console.error(e);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

module.exports = router;