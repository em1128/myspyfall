const { v4: uuidv4 } = require('uuid');

class RoomManager {
    constructor() {
        this.rooms = new Map();
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
}

module.exports = new RoomManager();
