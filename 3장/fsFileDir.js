const fs = require('fs');

fs.access('./folder',fs.constants.F_OK | fs.constants.R_OK| fs.constants.W_OK, (err) =>{
    if(err) {
        if(err.code === 'ENOENT'){
            console.log('폴더가 없는데요? 그래서 만들어 드렸습니다!');
            fs.mkdir('./folder',(err)=>{
                if(err){
                    throw err;
                }
                console.log('짜잔!');
                fs.open('./folder/file.js','w',(err,fd)=>{
                    if(err){
                        throw err
                    }
                    console.log('이제 file.js라는 빈 파일도 만들어 드렸습니다!');
                    fs.rename('./folder/file.js','./folder/newfile.js',(err)=>{
                        if(err){
                            throw err;
                        }
                        console.log('그리고는 그 녀석의 이름을 newfile.js로 바꿔드렸죠');
                    });
                });
            });
        } else {
            throw err
        }
    } else {
        console.log('폴더가 이미 있는데요?');
        fs.readdir('./folder', (err, dir)=>{
            if(err){
                throw err;
            }
            console.log('폴더의 내용물은 다음과 같습니다: ',dir);
            fs.unlink(`./folder/${dir[0]}`,(err)=>{
                if(err){
                    throw err;
                }
                console.log('그래서 그 파일을 삭제해 드렸습니다!');
                fs.rmdir('./folder',(err)=>{
                    if(err){
                        throw err;
                    }
                    console.log('그리고는 폴더도 삭제시켜버렸습니다!');
                });
            });
        });
    }
});