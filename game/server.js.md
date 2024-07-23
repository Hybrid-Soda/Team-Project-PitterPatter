const dgram = require('dgram');
const WebSocket = require('ws');

// UDP 서버 설정
const udpServer = dgram.createSocket('udp4');
const udpPort = 5054;

// WebSocket 서버 설정
const wss = new WebSocket.Server({ port: 8080 });

// UDP 데이터 수신 시 WebSocket 클라이언트로 전송
udpServer.on('message', (message, remote) => {
  console.log(`UDP message from ${remote.address}:${remote.port} - ${message}`);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message.toString());
    }
  });
});

udpServer.bind(udpPort);
console.log(`UDP server listening on port ${udpPort}`);
console.log('WebSocket server listening on port 8080');
