const SocketIO = require('socket.io');
console.log('socket');
module.exports = (server) => {
    const io = SocketIO(server, { path:'/socket.io'});
    io.on('connection', (socket)=>{
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속 ip: ',ip, socket.id, req.ip);
        socket.on('disconnect', ()=>{
            console.log('클라이언트 접속 해제',ip,socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error',(error)=>{
            console.error(error);
        });
        socket.on('reply',(data)=>{//이벤트명 reply사용(이벤트명을 사용함 > ws와의 차이점)
            console.log(data);
        });
        socket.interval = setInterval(()=>{
            socket.emit('news','Hello Socket.IO');//이벤트명 news
        },3000);
    });
}