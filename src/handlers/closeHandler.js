const roomManager = require('./roomManager');

function handleClose(ws) {
    if (!ws.roomId) return;

    const isRoomDeleted = roomManager.removePlayer(ws);
    console.log(`❌ 유저 퇴장: 방 ${ws.roomId}`);

    if (isRoomDeleted) {
        console.log(`🗑️ 방 삭제: ${ws.roomId}`);
    }
}

module.exports = handleClose;
