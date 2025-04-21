const { createClient } = require('redis');
const pub = createClient({ url: 'redis://redis:6379' });

pub.connect();

async function publishRoomListUpdate(rooms) {
  await pub.publish('roomListUpdate', JSON.stringify(rooms));
}

module.exports = { publishRoomListUpdate };
