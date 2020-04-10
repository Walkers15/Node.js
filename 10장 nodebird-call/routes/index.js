const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://shoon100.kro.kr:8002/v2';

axios.defaults.headers.origin = 'http://shoon100.kro.kr:8002';
const request = async(req,api)=>{
    console.log('토큰 발급',api);
    try{
        if(!req.session.jwt){
            const tokenResult = await axios.post(`${URL}/token`,{
                //axios 패키지를 사용하여 다른 서버에 요청 보냄
                clientSecret: process.env.CLIENT_SECRET,
            });
            if(tokenResult.data && tokenResult.data.code === 200){//토큰 발급 성공
                req.session.jwt = tokenResult.data.token;
            }else{ //토큰 발급 실패
                return res.json(tokenResult.data); //발급 실패 사유 응답
            }
        }
        return await axios.get(`${URL}${api}`,{
            headers: {authorization: req.session.jwt },
        });
    }catch(e){
        console.error(e);
        if(e.response.status < 500){//토큰 만료
            return e.response;
        }
        throw e;
    }
};

router.get('/mypost', async(req, res, next)=>{
    try{
        const result = await request(req,'/posts/my');
        res.json(result.data);
    } catch (error){
        if(error.code){
            console.error(error);
            next(error);
        }
    }
});

module.exports = router;