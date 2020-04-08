exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(403).send(`로그인 필요 <a href="/">홈으로 가기`);
    }
};

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    } else {
        res.redirect('/');
    }
};