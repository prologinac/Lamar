require('./settings')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const http = require('http')
const { handleMessages } = require('./main');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys")

// Keep-Alive Server for Render
const port = process.env.PORT || 3000
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot is Active');
}).listen(port);

async function startBot() {
    if (!fs.existsSync('./session')) fs.mkdirSync('./session');

    // Restore Session from Render Variable
    if (process.env.SESSION_ID && !fs.existsSync('./session/creds.json')) {
        try {
            console.log(chalk.blue("🔎 Restoring session from Render variable..."));
            const sessionId = process.env.SESSION_ID.split('~')[1];
            const decoded = Buffer.from(sessionId, 'base64').toString('utf-8');
            fs.writeFileSync('./session/creds.json', decoded);
            console.log(chalk.green("✅ Session restored!"));
        } catch (e) {
            console.log(chalk.red("❌ Failed to restore session. Check your SESSION_ID."));
        }
    }

    const { state, saveCreds } = await useMultiFileAuthState(`./session`)
    const { version } = await fetchLatestBaileysVersion()

    const client = makeWASocket({
        version,
        printQRInTerminal: false,
        logger: require('pino')({ level: 'silent' }),
        browser: ["Chrome", "Windows", "114.0.5735.198"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, require('pino')({ level: "fatal" })),
        }
    })

    client.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'open') console.log(chalk.bgGreen.black(" ✅ BOT IS LIVE ON RENDER "));
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) startBot();
        }
    })

    client.ev.on('creds.update', saveCreds)
    client.ev.on('messages.upsert', async chatUpdate => {
        await handleMessages(client, chatUpdate, true);
    })
}

startBot();
