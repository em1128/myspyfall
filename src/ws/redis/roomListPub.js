const { createClient } = require('redis');
const pub = createClient({ url: 'redis://localhost:6379' });

pub.connect();

async function publishRoomListUpdate(rooms) {
  await pub.publish('roomListUpdate', JSON.stringify(rooms));
}

module.exports = { publishRoomListUpdate };
