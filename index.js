const settings = require('./settings') // Loads your new settings object
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const http = require('http')
const pino = require("pino")
const { handleMessages } = require('./main');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    delay 
} = require("@whiskeysockets/baileys")

// Keep-Alive for Render
const port = process.env.PORT || 3000
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Madrin Bot Engine Active');
}).listen(port);

async function startMadrin() {
    let { version } = await fetchLatestBaileysVersion()
    
    // Auto-restore session from Render Environment Variable
    if (process.env.SESSION_ID && !fs.existsSync('./session/creds.json')) {
        if (!fs.existsSync('./session')) fs.mkdirSync('./session');
        try {
            let stringId = process.env.SESSION_ID.trim();
            if (stringId.includes('~')) stringId = stringId.split('~')[1];
            const decoded = Buffer.from(stringId, 'base64').toString('utf-8');
            fs.writeFileSync('./session/creds.json', decoded);
            console.log(chalk.green("✅ Session restored from Render Environment."));
        } catch (e) { console.log("Restore error:", e); }
    }

    const { state, saveCreds } = await useMultiFileAuthState(`./session`)

    const Madrin = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: ["Windows", "Chrome", "114.0.5735.198"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
        },
        markOnlineOnConnect: false,
        syncFullHistory: false
    })

    // FIXED PAIRING LOGIC FOR YOUR SETTINGS OBJECT
    if (!Madrin.authState.creds.registered) {
        // We pull the number from the 'settings' constant you exported
        let targetNumber = settings.ownerNumber || "255780309253"; 
        targetNumber = targetNumber.replace(/[^0-9]/g, '');

        console.log(chalk.yellow(`⏳ Handshaking for: ${targetNumber}...`));
        
        // The 15s delay to trigger the WhatsApp notification
        await delay(15000); 

        try {
            let code = await Madrin.requestPairingCode(targetNumber);
            code = code?.match(/.{1,4}/g)?.join("-") || code;
            console.log(chalk.black(chalk.bgGreen(` Madrin Pairing Code: `)), chalk.white.bold(code));
        } catch (error) {
            console.error(chalk.red(`Pairing Failed:`), error.message);
        }
    }

    Madrin.ev.on('connection.update', async (s) => {
        const { connection, lastDisconnect } = s;
        if (connection == "open") {
            console.log(chalk.bgCyan.black(` ✅ ${settings.botName.toUpperCase()} IS ONLINE! `));
            
            const credsData = fs.readFileSync('./session/creds.json');
            const base64Session = Buffer.from(credsData).toString('base64');
            const fullSessionId = `MADRIN~${base64Session}`;

            const msg = `*✅ ${settings.botName.toUpperCase()} CONNECTED!*\n\nCopy this code to your Render Environment Variables for 24/7 uptime:\n\n\`${fullSessionId}\``;
            await Madrin.sendMessage(Madrin.user.id, { text: msg });
        }
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                startMadrin();
            }
        }
    });

    Madrin.ev.on('creds.update', saveCreds);
    Madrin.ev.on('messages.upsert', async chatUpdate => {
        await handleMessages(Madrin, chatUpdate, true);
    });
}

startMadrin();
