const axios = require('axios');
const moment = require('moment-timezone');

async function githubCommand(sock, chatId, message, args) {
    const repoQuery = args[0];

    if (!repoQuery || !repoQuery.includes('/')) {
        return await sock.sendMessage(chatId, { 
            text: "⚠️ *Provide a path!* 🛡️\n\nExample: `.github prologinac/lamar`" 
        }, { quoted: message });
    }

    try {
        await sock.sendMessage(chatId, {
            react: { text: '⚔️', key: message.key }
        });

        const response = await axios.get(`https://api.github.com/repos/${repoQuery}`);
        const json = response.data;

        // LEGENDARY FORMATTING
        let legendaryTxt = `*┏━━━━━━━━━━━━━━━━━━━━┓*\n`;
        legendaryTxt += `*┃      🔱  GITHUB ASCENDANCY  🔱      ┃*\n`;
        legendaryTxt += `*┗━━━━━━━━━━━━━━━━━━━━┛*\n\n`;
        
        legendaryTxt += `*⛩️ REPOSITORY:* ${json.name.toUpperCase()}\n`;
        legendaryTxt += `*👑 ARCHITECT:* ${json.owner.login}\n\n`;
        
        legendaryTxt += `*📜 DESCRIPTION:* \n_${json.description || 'No description provided.'}_\n\n`;
        
        legendaryTxt += `*📊 STATISTICS:*\n`;
        legendaryTxt += `*◈ 🌟 STARS:* ${json.stargazers_count.toLocaleString()}\n`;
        legendaryTxt += `*◈ 🍴 FORKS:* ${json.forks_count.toLocaleString()}\n`;
        legendaryTxt += `*◈ 👁️ WATCH:* ${json.watchers_count.toLocaleString()}\n`;
        legendaryTxt += `*◈ 📁 SIZE:* ${(json.size / 1024).toFixed(2)} MB\n\n`;
        
        legendaryTxt += `*⏳ LAST ASCENSION:* \n${moment(json.updated_at).format('MMMM Do YYYY, h:mm:ss a')}\n\n`;
        
        // Hardcoded URL as requested
        legendaryTxt += `*🔗 GATEWAY:* \nhttps://github.com/prologinac/lamar\n\n`;
        
        legendaryTxt += `*⚔️ POWERED BY YOUR BOT ⚔️*`;

        await sock.sendMessage(chatId, { 
            image: { url: json.owner.avatar_url }, 
            caption: legendaryTxt,
            contextInfo: {
                externalAdReply: {
                    title: `SOURCE CODE: ${json.name}`,
                    body: `Main Language: ${json.language || 'Unknown'}`,
                    mediaType: 1,
                    thumbnailUrl: json.owner.avatar_url,
                    sourceUrl: "https://github.com/prologinac/lamar"
                }
            }
        }, { quoted: message });

    } catch (error) {
        console.error('GitHub Error:', error.message);
        await sock.sendMessage(chatId, { 
            text: `*🚫 ASCENSION FAILED 🚫*\n\n` +
                  `*REASON:* REPOSITORY NOT FOUND\n` +
                  `*CHECK:* owner/repo format.`
        }, { quoted: message });
    }
}

module.exports = githubCommand;
