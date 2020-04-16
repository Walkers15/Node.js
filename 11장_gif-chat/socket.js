const SocketIO = require('socket.io');
const axios = require('axios');
//console.log('socket');

module.exports = (server,app,sessionMiddleware) => {
    const io = SocketIO(server, { path:'/socket.io'});
    app.set('io',io);
    const room = io.of('/room'); //of메소드를 통해 다른 네임스페이스를 만들어 접속할 수 있음
    const chat = io.of('/chat');
    io.use((socket,next)=>{
        sessionMiddleware(socket.request, socket.request.res, next); //req,res,next
    });
    room.on('connection',(socket)=>{//각각의 네임스페이스에 네임스페이스.on을 통해 이벤트 리스너를 구분하여 붙여줄 수 있음
        console.log('room네임스페이스에 접속');
        socket.on('disconnect', ()=>{
            console.log('room네임스페이스 접속 해제');
        });
    });
    chat.on('connection', (socket)=>{ //join과 leave로 소켓의 방을 구분한다.(SocketIO > 네임스페이스 > 방)
        console.log('chat 네임스페이스에 접속');
        const req = socket.request;
        const { headers: { referer } } = req; //socket.request.headers.referer 를 통해 웹 페이지의 URL을 가져올 수 있음
        const roomId = referer
            .split('/')[referer.split('/').length-1]
            .replace(/\?.+/,''); //roomId를 알아내기 위해 URL을 파싱
        socket.join(roomId);
        socket.to(roomId).emit('join',{
            user:'system',
            chat: `${req.session.color}님이 입장하셨습니다.`
        });
        socket.on('disconnect', ()=>{
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
            const currentRoom = socket.adapter.rooms[roomId]; //참여 중인 소켓의 정보를 가져옴
            const userCount = currentRoom ? currentRoom.length : 0;//소켓이 없으면 null이므로 userCount가 0이 됨.
            if(userCount === 0){ //userCount가 0이면 방 삭제
                axios.delete(`http://shoon100.kro.kr:8005/room/${roomId}`)
                    .then(()=>{
                        console.log('방 제거 요청 성공');
                    })
                    .catch((error)=>{
                        console.error(error);
                    });
            } else {//아닌 경우 남아 있는 사용자들에게 나갔다는 메시지를 보냄
                socket.to(roomId).emit('exit',{
                    user: 'system',
                    chat: `${req.session.color}님이 퇴장하셨습니다.`,
                });
            }
        });
    });
};