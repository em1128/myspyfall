function Connect(ws, userId, nickname){
    ws.send(JSON.stringify({ type: 'connect', userId, nickname }));
}
function CreateRoom(ws, roomId){
    ws.send(JSON.stringify({ type: 'roomCreated', roomId }));
}
function JoinRoom(ws, roomId){
    ws.send(JSON.stringify({ type: 'roomJoined', roomId }));
}
function GameStart(ws){
    ws.send(JSON.stringify({ type: 'gameStart' }));
}
function RoomList(ws, rooms){
    ws.send(JSON.stringify({ type: 'roomList', rooms}));
}
function Error(ws, message){
    ws.send(JSON.stringify({ type: 'error', message}));
}
module.exports = {
    Connect,
    CreateRoom,
    JoinRoom,
    GameStart,
    RoomList,
    Error,
}