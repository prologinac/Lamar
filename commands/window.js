async function windowCommand(sock, chatId, message, args) {
    const category = args[0]?.toLowerCase();
    const page = parseInt(args[1]) || 1;

    // --- PAGINATED CATEGORIES ---

    const menus = {
        general: {
            1: `╭══════════════════════⟡
*┃⚙️ ❚❚ GENERAL (PG 1) ❚❚ ⚙️ *
╰══════════════════════⟡
> .8ball <questions>
> .admins
> .alive 
> .attp <text>
> .fact
> .groupinfo
> .jid
> .joke
> .lyrics <song_title>
> .news
\n*Type .window general 2 for more*`,
            2: `╭══════════════════════⟡
*┃⚙️ ❚❚ GENERAL (PG 2) ❚❚ ⚙️ *
╰══════════════════════⟡
> .owner
> .ping 
> .quote
> .ss <link>
> .staff
> .trt <text> <language>
> .tts <text>
> .url
> .vv
> .weather <city>
\n*Type .window general 1 to go back*`
        },
        admin: {
            1: `╭══════════════════════⟡
*┃😎 ❚❚ ADMIN (PG 1) ❚❚ 😎 *
╰══════════════════════⟡
> .antibadword
> .antilink
> .antitag <on/off>
> .ban @user
> .chatbot
> .clear
> .delete / .del
> .demote @user
> .goodbye <on/off>
> .hidetag <message>
\n*Type .window admin 2 for more*`,
            2: `╭══════════════════════⟡
*┃😎 ❚❚ ADMIN (PG 2) ❚❚ 😎 *
╰══════════════════════⟡
> .kick @user
> .mute <minutes>
> .promote @user
> .resetlink
> .setgdesc <description>
> .setgname <new name>
> .setgpp (reply to image)
> .tagall
> .unmute
> .warn @user
> .warnings @user
> .welcome <on/off>`
        },
        misc: {
            1: `╭══════════════════════⟡
┃ 🎒 ❚❚ MISC (PG 1) ❚❚ 🎒
╰══════════════════════⟡
> .circle
> .comrade
> .gay
> .glass
> .heart
> .horny
> .its-so-stupid
> .jail
\n*Type .window misc 2 for more*`,
            2: `╭══════════════════════⟡
┃ 🎒 ❚❚ MISC (PG 2) ❚❚ 🎒
╰══════════════════════⟡
> .lgbt
> .lolice
> .namecard
> .oogway
> .passed 
> .triggered
> .tweet
> .ytcomment`
        }
    };

    // Standard single-page categories
    const singleMenus = {
        owner: `╭══════════════════════⟡\n┃🦾 ❚❚ OWNER COMMANDS ❚❚ 🦾\n╰══════════════════════⟡\n> .anticall\n> .antidelete\n> .autoread\n> .autoreact\n> .autostatus\n> .autotyping\n> .clearsession\n> .cleartmp\n> .mention\n> .mode\n> .pmblocker\n> .setmention\n> .setpp\n> .settings`,
        image: `╭═════════════════════════⟡\n┃ 🗺️ ❚❚ IMAGE COMMANDS ❚❚ 🗺️\n╰═════════════════════════⟡\n> .blur\n> .crop\n> .emojimix\n> .igs\n> .igsc\n> .meme\n> .removebg\n> .remini\n> .simage\n> .sticker\n> .take\n> .tgsticker`,
        ai: `╭══════════════════════⟡\n*┃ 🌝 ❚❚ AI COMMANDS ❚❚ 🌝 *\n╰══════════════════════⟡\n> .flux\n> .gemini\n> .gpt\n> .imagine\n> .sora`,
        download: `╭══════════════════════⟡\n┃ 🎬 ❚❚ DOWNLOADER ❚❚ 🎬\n╰══════════════════════⟡\n> .facebook\n> .instagram\n> .play\n> .song\n> .spotify\n> .tiktok\n> .video\n> .ytmp3\n> .ytmp4`,
        fun: `╭══════════════════════⟡\n*┃🤪 ❚❚ FUN COMMANDS ❚❚ 🤪 *\n╰══════════════════════⟡\n> .character\n> .compliment\n> .flirt\n> .goodnight\n> .insult\n> .roseday\n> .shayari\n> .ship\n> .simp\n> .stupid\n> .wasted`,
        github: `╭══════════════════════⟡\n┃🗝️ ❚❚ GITHUB ❚❚🗝️\n╰══════════════════════⟡\n> .git\n> .github \n> .sc\n> .script`
    };

    // --- LOGIC ---
    let finalMenu = "";

    if (menus[category]) {
        finalMenu = menus[category][page] || menus[category][1];
    } else if (singleMenus[category]) {
        finalMenu = singleMenus[category];
    } else {
        finalMenu = `🏮 *COMMAND WINDOWS* 🏮\n\nChoose a category:\n> .window general\n> .window admin\n> .window owner\n> .window image\n> .window ai\n> .window download\n> .window fun\n> .window misc\n> .window github`;
    }

    await sock.sendMessage(chatId, { text: finalMenu }, { quoted: message });
}

module.exports = windowCommand;
