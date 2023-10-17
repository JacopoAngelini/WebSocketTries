const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');
const selfsigned = require('selfsigned');

// Generate a self-signed certificate and key
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });
const privateKey = pems.private;
const certificate = pems.cert;

const server = https.createServer({
  key: privateKey,
  cert: certificate,
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('A user has connected!');

  ws.on('message', (data) => {
    // Broadcast the received message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('WebSocket server is listening on port 3000 (HTTPS)');
});
