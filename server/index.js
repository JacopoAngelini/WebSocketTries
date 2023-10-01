const WebSocket = require('ws'); // include il modulo di ws: il principale server di websocket

function parseLocation(url) {
    let a = document.createElement('a');
    a.href = url;

    return a;
}

let localURL = parseLocation(window.location);

ws = new WebSocket("wss://" + localURL.host); // crea il server specificando dove il server viene ospitato ovvero la porta 8082

// il server ascolta un evento, in questo caso basato sulla connesione di un utente al server tramite ''connection'', e performa l'azione nella callback

wss.on('connection', ws => {
    console.log('un utente si è collegato!');

    // quando arriva un messaggio da un utente (vedere index.js) performa un azione, i data vanno a finire in 'data'
    ws.on('message', data => {
        console.log(`un utente ha mandato il numero: ${data}`)

    })

    // perferma un azione quando si chiude la connessione, ovvero quando la pagina viene chiusa o ricaricata
    ws.on('close', () => {  
        console.log('utente scollegato')
    })
}) 