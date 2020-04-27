#!/usr/bin/env node
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
});
const answerCallback = (ans) => {
    if(ans === 'y'){
        console.log('ㄳ');
        rl.close();
    }else if(ans === 'n'){
        console.log('ㅈㅅ');
        rl.close();
    }else{
        console.log('y또는 n만 입력하세요.');
        rl.question('예제가 재미있습니까?(y/n)', answerCallback);
    }
}
rl.question('예제가 재미있습니까?(y/n)', answerCallback);