const WebSocket = require('ws');
const clients = new Set();
const subscribers = new Set();

module.exports = {
  addClient(ws) {
    clients.add(ws);
  },
  removeClient(ws) {
    clients.delete(ws);
    subscribers.delete(ws);
  },
  subscribe(ws) {
    subscribers.add(ws);
  },
  unsubscribe(ws) {
    subscribers.delete(ws);
  },
  broadcast(message) {
    const json = JSON.stringify(message);

    for (const ws of subscribers) {
      console.log('ws : ', ws);
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(json);
      }
    }
  },
};
