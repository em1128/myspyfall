const { createClient } = require('redis');
const sub = createClient({ url: 'redis://localhost:6379' });
const { broadcast } = require('../handlers/stateManagers/clientManager');

sub.connect();

sub.subscribe('roomListUpdate', (message) => {
  const rooms = JSON.parse(message);
  console.log('[Redis] 받은 메시지:', rooms);
  broadcast({ type: 'roomList', rooms });
});
