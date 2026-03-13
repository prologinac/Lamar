const settings = require('../settings');
const os = require('os');

async function helpCommand(sock, chatId, message, pushname, config) {
    // Basic Configuration
    const prefix = config && config.PREFIX ? config.PREFIX : '.';
    const mode = settings.mode || '𝙿𝚄𝙱𝙻𝙸𝙲';
    const version = settings.version || '𝟹.𝟶.𝟶';
    
    // Technical Calculations
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);

    // Legendary Rank & Metrics
    const ranks = ['SYSTEM OVERLORD', 'GRANDMASTER', 'CHIEF ARCHITECT', 'ROOT EXECUTOR', 'NEURAL WHISPERER', 'DARK NODE ADMIN'];
    const userRank = ranks[Math.floor(Math.random() * ranks.length)];
    const ping = Math.floor(Math.random() * (45 - 12) + 12); 
    const kernel = `6.2.0-MADRIN-PRO-${Math.floor(1000 + Math.random() * 9000)}`;
    const integrity = (Math.random() * (100 - 99.8) + 99.8).toFixed(3);
       
    const helpMessage = `
    *╭═══════════════════════╗*
*        𖣘 ᗰᗩᗪᖇIᑎ ᗰᗪ 𖣘*
    *╰═══════════════════════╝*
    *◊◈◊◊◊◊◊       ⎚⎚  ⎚⎚     ◊◊◊◊◊◈◊*
*┃ ╔═══════════════════════════╗*
*┃ ║ 👤 𝗨𝗦𝗘𝗥   :❯ ${pushname || 'User'}*
*┃ ║ 👑 𝗥𝗔𝗡𝗞   :❯ ${userRank}*
*┃ ║ 🛡️ 𝗠𝗢𝗗𝗘   :❯ ${mode}*
*┃ ║ 🧬 𝗩𝗘𝗥𝗦𝗜𝗢𝗡:❯ ${version}*
*┃ ║ 🔗 𝗞𝗘𝗥𝗡𝗘𝗟 :❯ ${kernel}*
*┃ ║ ⚡ 𝗟𝗔𝗧𝗘𝗡𝗖𝗬:❯ ${ping}ms*
*┃ ║ 🚀 𝗨𝗣𝗧𝗜𝗠𝗘 :❯ ${hours}h ${minutes}m*
*┃ ║ 📟 𝗥𝗔𝗠    :❯ [████████░░] ${ramUsage}MB*
*┃ ║ 💠 𝗜𝗡𝗧𝗘𝗚𝗥𝗜𝗧𝗬:❯ ${integrity}%*
*┃ ║ 🔐 𝗘𝗡𝗖𝗥𝗬𝗣𝗧:❯ QUANTUM-AES*
*┃ ║ 🛰️ 𝗦𝗧𝗔𝗧𝗨𝗦 :❯ 🟢 LEGENDARY_ACTIVE*
*┃ ╚═══════════════════════════╝*
*┃⊗❂⊗❂⊗❂⊗❂⊗❂⊗❂⊗❂⊗❂⊗❂⊗❂⊗❂⊗❂⊗*
*╰───────────────────────────⟡*

* hєrє wє gσ αgαín hσmíє ${pushname || 'User'} 😎*

*╭══════════════════════⟡*
*┃⚙️ ❚❚ ɢᴇɴᴇʀᴀʟ ᴄᴏᴍᴍᴀɴᴅ ❚❚ ⚙️ *
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃😎 ❚❚ ᴀᴅᴍɪɴ ᴄᴏᴍᴍᴀɴᴅs ❚❚ 😎 *
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃🦾 ❚❚ ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs ❚❚ 🦾*
*╰══════════════════════⟡*

*╭═════════════════════════⟡*
*┃ 🗺️ ❚❚ ɪᴍᴀɢᴇ/sᴛɪᴄᴋᴇʀ ᴄᴏᴍᴍᴀɴᴅs ❚❚ 🗺️*
*╰═════════════════════════⟡*

*╭══════════════════════⟡*
*┃ 😍 ❚❚ ᴘɪᴇs ᴄᴏᴍᴍᴀɴᴅs ❚❚ 😍 *
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃💡 ❚❚ ɢᴀᴍᴇ ᴄᴏᴍᴍᴀɴᴅs ❚❚ 💡〕*
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃ 🌝 ❚❚ ᴀɪ ᴄᴏᴍᴍᴀɴᴅs ❚❚ 🌝 *
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃🤪 ❚❚ ғᴜɴ ᴄᴏᴍᴍᴀɴᴅs ❚❚ 🤪 *
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃ 📓 ❚❚ ᴛᴇxᴛᴍᴀᴋᴇʀ ❚❚ 📓*
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃ 🎬 ❚❚ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ❚❚ 🎬*
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃🎒 ❚❚ ᴍɪsᴄ ❚❚ 🎒*
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃🎎 ❚❚ ᴀɴɪᴍᴇ ❚❚🎎 *
*╰══════════════════════⟡*

*╭══════════════════════⟡*
*┃🗝️ ❚❚ ɢɪᴛʜᴜʙ ❚❚🗝️*
*╰══════════════════════⟡*

*ᑭOᗯᗴᖇᗴᗪ ᗷY ᗰᗩᗪᖇIᑎ ᗷOT Tᗴᑕᕼ*`;

    try {
        // Using your Catbox URL directly
        const imageUrl = 'https://files.catbox.moe/kg0u3p.jpg';

        await sock.sendMessage(chatId, {
            image: { url: imageUrl },
            caption: helpMessage,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: false,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402325089913@newsletter',
                    newsletterName: 'MADRIN BOT',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });

    } catch (error) {
        console.error('Error in help command:', error);
        // Fallback to text if the image fails to load
        await sock.sendMessage(chatId, { text: helpMessage }, { quoted: message });
    }
}

module.exports = helpCommand;
