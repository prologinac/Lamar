async function windowCommand(sock, chatId, message, args) {
    const category = args[0]?.toLowerCase();

    // --- CATEGORY DEFINITIONS ---

    const generalMenu = `╭══════════════════════⟡
*┃⚙️ ❚❚ GENERAL COMMAND ❚❚ ⚙️ *
╰══════════════════════⟡
> .ping 
> .alive 
> .tts <text>
> .owner
> .joke
> .quote
> .fact
> .weather <city>
> .news
> .attp <text>
> .lyrics <song_title>
> .8ball <questions>
> .groupinfo
> .staff / .admins
> .vv
> .trt <text> <language>
> .ss <link>
> .jid
> .url`;

    const adminMenu = `╭══════════════════════⟡
*┃😎 ❚❚ ADMIN COMMANDS ❚❚ 😎 *
╰══════════════════════⟡
> .ban @user
> .promote @user
> .demote @user
> .mute <minutes>
> .unmute
> .delete / .del
> .kick @user
> .warnings @user
> .warn @user
> .antilink
> .antibadword
> .clear
> .tagall
> .hidetag <message>
> .antitag <on/off>
> .welcome <on/off>
> .goodbye <on/off>
> .setgdesc <description>
> .setgname <new name>
> .setgpp (reply to image)`;

    const ownerMenu = `╭══════════════════════⟡
┃🦾 ❚❚ OWNER COMMANDS ❚❚ 🦾
╰══════════════════════⟡
> .mode <public/private>
> .clearsession
> .antidelete
> .cleartmp
> .settings
> .setpp <reply to image>
> .autoreact <on/off>
> .autostatus <on/off>
> .autostatus react <on/off>
> .autotyping <on/off>
> .autoread <on/off>
> .anticall <on/off>
> .pmblocker <on/off/status>
> .setmention <reply to message>
> .mention <on/off>`;

    const imageMenu = `╭═════════════════════════⟡
┃ 🗺️ ❚❚ IMAGE/STICKER COMMANDS ❚❚ 🗺️
╰═════════════════════════⟡
> .blur <image>
> .simage <reply to sticker>
> .sticker <reply to image>
> .removebg
> .remini
> .crop <reply to image>
> .tgsticker <link>
> .meme
> .take <packname>
> .emojimix <emj1>+<emj2>
> .igs<insta link>
> .igsc <insta link>`;

    const aiMenu = `╭══════════════════════⟡
*┃ 🌝 ❚❚ AI COMMANDS ❚❚ 🌝 *
╰══════════════════════⟡
> .gpt <question>
> .gemini <question>
> .imagine <prompt>
> .flux <prompt>
> .sora <prompt>`;

    const downloadMenu = `╭══════════════════════⟡
┃ 🎬 ❚❚ DOWNLOADER ❚❚ 🎬
╰══════════════════════⟡
> .play <song_name>
> .song <song_name>
> .spotify <query>
> .instagram <link>
> .facebook <link>
> .tiktok <link>
> .video <song_name>
> .ytmp4 <link>/name
> .ytmp3 <link>/name`;

    const funMenu = `╭══════════════════════⟡
*┃🤪 ❚❚ FUN COMMANDS ❚❚ 🤪 *
╰══════════════════════⟡
> .compliment @user
> .insult @user
> .flirt
> .shayari
> .goodnight
> .character @user
> .wasted @user
> .simp @user
> .ship @user
> .stupid @user [text]`;

    const miscMenu = `╭══════════════════════⟡
┃ 🎒 ❚❚ MISC ❚❚ 🎒
╰══════════════════════⟡
> .heart
> .horny
> .circle
> .lgbt
> .lolice
> .its-so-stupid
> .namecard
> .oogway
> .tweet
> .ytcomment
> .comrade
> .gay
> .glass
> .jail
> .passed 
> .triggered`;

    const githubMenu = `╭══════════════════════⟡
┃🗝️ ❚❚ GITHUB ❚❚🗝️
╰══════════════════════⟡
> .git
> .github 
> .sc
> .script`;

    // --- SWITCH LOGIC ---

    let finalMenu = "";
    
    switch (category) {
        case 'general': finalMenu = generalMenu; break;
        case 'admin': finalMenu = adminMenu; break;
        case 'owner': finalMenu = ownerMenu; break;
        case 'image': finalMenu = imageMenu; break;
        case 'ai': finalMenu = aiMenu; break;
        case 'download': finalMenu = downloadMenu; break;
        case 'fun': finalMenu = funMenu; break;
        case 'misc': finalMenu = miscMenu; break;
        case 'git':
        case 'github': finalMenu = githubMenu; break;
        
        default:
            finalMenu = `🏮 *COMMAND WINDOWS* 🏮\n\nType the command followed by a category:\n\n` +
                        `> *.window general*\n` +
                        `> *.window admin*\n` +
                        `> *.window owner*\n` +
                        `> *.window image*\n` +
                        `> *.window ai*\n` +
                        `> *.window download*\n` +
                        `> *.window fun*\n` +
                        `> *.window misc*\n` +
                        `> *.window github*`;
    }

    await sock.sendMessage(chatId, { text: finalMenu }, { quoted: message });
}

module.exports = windowCommand;
