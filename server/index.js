const WebSocket = require('ws'); // include il modulo di ws: il principale server di websocket

const wss = new WebSocket.Server({ port: 8082 }) // crea il server specificando dove il server viene ospitato ovvero la porta 8082

// il server ascolta un evento, in questo caso basato sulla connesione di un utente al server tramite ''connection'', e performa l'azione nella callback

wss.on('connection', ws => {
    console.log('un utente si è collegato!');

    // perferma un azione quando si chiude la connessione, ovvero quando la pagina viene chiusa o ricaricata
    ws.on('close', () => {  
        console.log('utente scollegato')
    })
}) 