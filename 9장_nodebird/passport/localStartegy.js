const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField : 'email', //전략에 관한 설정, usernameField와 passwordField에 일치하는 req.body(req.body.email, req.body.password)의 속성을 적음
        passwordField: 'password',
    }, async (email, password, done)=>{
        try{
            const exUser = await User.findOne({where: {email}});//디비에서 해당 정보를 가진 유저가 있나 조회
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){//비밀번호까지 일치하는 경우
                    done(null, exUser); //성공과 함께 유저 정보 전달
                } else {//실패한경우
                    //info에 flash에서 사용할 메시지 전달
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {//디비에 해당 정보가 없을 경우
                done(null, false, { message: '가입되지 않은 회원입니다' });
            }
        } catch (error){
            console.error(error);
            done(error);
        }
    }));
};