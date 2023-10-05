const WebSocket = require("ws"); // include il modulo di ws: il principale server di websocket
const http = require("http");
const express =   require('express');
const app = express();
const server = http.createServer(app);

wss = new WebSocket.Server({ server:server });
 // crea il server specificando dove il server viene ospitato ovvero la porta 8082

server.listen(8082);

// il server ascolta un evento, in questo caso basato sulla connesione di un utente al server tramite ''connection'', e performa l'azione nella callback

wss.on("connection", (ws) => {
  console.log("un utente si è collegato!");

  // quando arriva un messaggio da un utente (vedere index.js) performa un azione, i data vanno a finire in 'data'
  ws.on("message", (data) => {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
    // perferma un azione quando si chiude la connessione, ovvero quando la pagina viene chiusa o ricaricata
    ws.on("close", () => {
      console.log("utente scollegato");
    });
  });
});
