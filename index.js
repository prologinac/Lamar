require('./settings')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const pino = require("pino")
const http = require('http') // Built-in Node.js module (No install needed)
const { handleMessages } = require('./main');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys")

// --- LIGHTWEIGHT KEEP-ALIVE SERVER (No Express) ---
const port = process.env.PORT || 3000
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is Active\n');
}).listen(port, () => {
    console.log(chalk.cyan(`Keep-alive server listening on port ${port}`));
});

async function startXeonBotInc() {
    // 1. Setup Session Directory
    if (!fs.existsSync('./session')) {
        fs.mkdirSync('./session');
    }

    // 2. Restore Session from Env Var (Base64)
    if (!fs.existsSync('./session/creds.json') && process.env.SESSION_ID) {
        console.log(chalk.blue("🔎 SESSION_ID detected. Restoring session..."));
        try {
            const decodedCreds = Buffer.from(process.env.SESSION_ID, 'base64').toString('utf-8');
            fs.writeFileSync('./session/creds.json', decodedCreds);
            console.log(chalk.green("✅ session/creds.json restored."));
        } catch (err) {
            console.log(chalk.red("❌ Error decoding SESSION_ID: " + err.message));
        }
    }

    let { version } = await fetchLatestBaileysVersion()
    const { state, saveCreds } = await useMultiFileAuthState(`./session`)

    const XeonBotInc = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true, 
        // Shows the Windows icon in Linked Devices
        browser: ["Windows", "Chrome", "20.0.04"], 
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        syncFullHistory: false
    })

    XeonBotInc.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'open') {
            console.log(chalk.bgGreen.black(" WINDOWS SESSION ACTIVE "));
            console.log(chalk.green(`Connected successfully!`));
        }

        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.restartRequired) {
                startXeonBotInc();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red("🚫 Logged out. New SESSION_ID required."));
                if (fs.existsSync('./session')) fs.rmSync('./session', { recursive: true, force: true });
            } else {
                console.log(chalk.yellow(`Connection lost (Reason: ${reason}). Reconnecting...`));
                setTimeout(() => startXeonBotInc(), 5000);
            }
        }
    });

    XeonBotInc.ev.on('creds.update', saveCreds);

    XeonBotInc.ev.on('messages.upsert', async chatUpdate => {
        try {
            await handleMessages(XeonBotInc, chatUpdate, true);
        } catch (err) {
            console.log(chalk.red("Error: "), err);
        }
    });

    return XeonBotInc;
}

startXeonBotInc();
