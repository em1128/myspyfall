const clientManager = require('./stateManagers/clientManager');
const roomManager = require('./stateManagers/roomManager');
const Response = require('./responseHandler');
require('../redis/roomListSub');
const { publishRoomListUpdate } = require('../redis/roomListPub');

function handleMessage(ws, message) {
    try{
        const data = JSON.parse(message);
        
        console.log('data : ' + JSON.stringify(data, null, 2));
        if(data.type === 'connect'){
            clientManager.addClient(ws);
            const userId = roomManager.connect(ws, data.nickname);
            Response.Connect(ws, userId, data.nickname);
            console.log(`🎉 서버 접속 : ${data.nickname}(${userId})`);
        }

        if (data.type === 'createRoom') {
            const roomId = roomManager.createRoom(ws, data.title, data.capacity);
            Response.CreateRoom(ws, roomId);
            console.log(`🔥 방 생성: ${roomId}`);
            
            const users = roomManager.users;
            const rooms = roomManager.getRoomList() || [];
            clientManager.unsubscribe(ws);
            publishRoomListUpdate(rooms);
            console.log(`📄 유저 목록: ${[...users.keys()]}`);
            console.log(`♻️ 방 목록 갱신: ${[...roomManager.rooms.keys()]}`);
        }

        if (data.type === 'joinRoom') {
            const room = roomManager.joinRoom(ws, data.roomId);
            if (room) {
                Response.JoinRoom(ws, data.roomId);
                console.log(`👥 유저 입장: ${data.roomId} (현재 ${room.players.length}명)`);
                clientManager.unsubscribe(ws);
            } else {
                Response.Error('방이 존재하지 않습니다.');
                console.error('방이 존재하지 않습니다.');
            }
        }

        if (data.type === 'ready') {
            if (roomManager.markReady(data.roomId)) {
                const room = roomManager.rooms.get(data.roomId);
                room.players.forEach(player => Response.GameStart(player));
                console.log(`🚀 게임 시작! 방: ${data.roomId}`);
            }
        }
        
        if (data.type === 'roomList') {
            clientManager.subscribe(ws);
            const rooms = roomManager.getRoomList() || [];
            
            if(rooms.length > 0){
                Response.RoomList(ws, rooms);
                console.log(`📄 방 목록! 방: ${[...roomManager.rooms.keys()]}`);
            }else{
                Response.Error(ws, '비어있는 방이 존재하지 않습니다.');
                console.error('비어있는 방이 존재하지 않습니다.');
            }
        }
    }catch(e){
        Response.Error(ws, `메시지 형식이 올바르지 않습니다.(${e.message})`);
        console.error(e.message);
    }
    
}

module.exports = handleMessage;
