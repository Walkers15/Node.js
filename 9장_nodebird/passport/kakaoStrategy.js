const kakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,//내 클라이언트 아이디는 개인정보이므로, dotenv를 사용하여 저장
        callbackURL: '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        try{
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao'}});
            if(exUser){
                done(null, exUser);
            } else {
                const newUser = await User.create({//회원가입
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error){
            console.error(error);
            done(error);
        }
        }));
};