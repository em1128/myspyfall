const roomManager = require('./roomManager');

function handleMessage(ws, message) {
    try{
        const data = JSON.parse(message);
        
        if(data.type === 'connect'){
            const userId = roomManager.connect(ws, data.nickname);
            ws.send(JSON.stringify({ type: 'connect', userId, nickname: data.nickname }));
            console.log(`🎉 서버 접속 : ${data.nickname}(${userId})`);
        }

        if (data.type === 'createRoom') {
            const roomId = roomManager.createRoom(ws);
            ws.send(JSON.stringify({ type: 'roomCreated', roomId }));
            console.log(`🔥 방 생성: ${roomId}`);
        }

        if (data.type === 'joinRoom') {
            const room = roomManager.joinRoom(ws, data.roomId);
            if (room) {
                ws.send(JSON.stringify({ type: 'roomJoined', roomId: data.roomId }));
                console.log(`👥 유저 입장: ${data.roomId} (현재 ${room.players.length}명)`);
            } else {
                ws.send(JSON.stringify({ type: 'error', message: '방이 존재하지 않습니다.' }));
            }
        }

        if (data.type === 'ready') {
            if (roomManager.markReady(data.roomId)) {
                const room = roomManager.rooms.get(data.roomId);
                room.players.forEach(player => player.send(JSON.stringify({ type: 'gameStart' })));
                console.log(`🚀 게임 시작! 방: ${data.roomId}`);
            }
        }
    }catch(e){
        console.error(e.message);
        ws.send(JSON.stringify({ type: 'error', message: `메시지 형식이 올바르지 않습니다.(${message}` }));
    }
    
}

module.exports = handleMessage;
