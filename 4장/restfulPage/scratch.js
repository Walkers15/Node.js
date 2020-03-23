const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>Hello World!</h1>');
    res.end('<p>Hello, Node.js!</p>');
});

server.listen(80);

server.on('listening', ()=>{
    console.log('3000번 포트에서 대기중');
});
server.on('error', (error)=>{
    console.error(error);
});