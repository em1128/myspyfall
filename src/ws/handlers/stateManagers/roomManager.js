const { v4: uuidv4 } = require('uuid');

class RoomManager {
    constructor() {
        this.rooms = new Map();
        this.users = new Map();
    }

    connect(ws, nickname){
        const userId = uuidv4();
        // 여기서 웹소켓 객체는 사용자의 연결을 기억하기 위해 저장.
        // => 특정 사용자들에게 메시지를 전송할 때 필요하므로 저장하는 것.
        this.users[userId] = { nickname: nickname, ws};
        return userId;
    }
    createRoom(ws) {
        const roomId = uuidv4();
        this.rooms.set(roomId, { players: [], readyCount: 0 });

        ws.roomId = roomId;
        this.rooms.get(roomId).players.push(ws);

        return roomId;
    }

    joinRoom(ws, roomId) {
        const room = this.rooms.get(roomId);
        if (!room) return null;

        ws.roomId = roomId;
        room.players.push(ws);

        return room;
    }

    markReady(roomId) {
        const room = this.rooms.get(roomId);
        if (!room) return false;

        room.readyCount++;
        return room.readyCount === room.players.length;
    }

    removePlayer(ws) {
        if (!ws.roomId) return;

        const room = this.rooms.get(ws.roomId);
        if (!room) return;

        room.players = room.players.filter(player => player !== ws);

        if (room.players.length === 0) {
            this.rooms.delete(ws.roomId);
            return true;
        }

        return false;
    }

    getRoomList(){
        const keysToExclude = ['players'];
        const roomArray = Array.from(this.rooms, ([roomId, value]) => {
            // 🔥 새로운 객체를 만들면서 특정 키를 제외
            const filteredValue = { ...value };
            keysToExclude.forEach(key => delete filteredValue[key]); 
            // roomId를 객체에 필드로 추가가
            return { roomId, ...filteredValue };
        });
        console.log('roomArray: ', roomArray);
        return roomArray;
    }
}

module.exports = new RoomManager();
