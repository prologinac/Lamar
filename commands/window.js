async function windowCommand(sock, chatId, message, args) {
    const category = args[0]?.toLowerCase();

    // If no category, send the Selection Menu with an image
    if (!category) {
        const menuHeader = `🏮 *MADRIN-BOT COMMAND CENTER* 🏮

Select a category by typing the command:

1️⃣  *.window general*
2️⃣  *.window admin*
3️⃣  *.window owner*
4️⃣  *.window image*
5️⃣  *.window ai*
6️⃣  *.window download*
7️⃣  *.window fun*
8️⃣  *.window misc*
9️⃣  *.window github*

_Example: Type .window admin to see admin commands._`;

        return await sock.sendMessage(chatId, { 
            image: { url: "https://github.com/prologinac.png" }, // Your profile pic
            caption: menuHeader 
        }, { quoted: message });
    }

    // --- CATEGORIES (Alphabetized) ---
    // (Keep the same categories we sorted earlier)
    const menus = {
        general: `╭══════════════════════⟡\n*┃⚙️ ❚❚ GENERAL COMMAND ❚❚ ⚙️ *\n╰══════════════════════⟡\n> .8ball\n> .admins\n> .alive\n> .attp\n> .fact\n> .groupinfo\n> .jid\n> .joke\n> .lyrics\n> .news\n> .owner\n> .ping\n> .quote\n> .ss\n> .staff\n> .trt\n> .tts\n> .url\n> .vv\n> .weather`,
        admin: `╭══════════════════════⟡\n*┃😎 ❚❚ ADMIN COMMANDS ❚❚ 😎 *\n╰══════════════════════⟡\n> .antibadword\n> .antilink\n> .antitag\n> .ban\n> .chatbot\n> .clear\n> .delete\n> .demote\n> .goodbye\n> .hidetag\n> .kick\n> .mute\n> .promote\n> .resetlink\n> .tagall\n> .unmute\n> .warn\n> .welcome`,
        // ... (add the other categories here following the same pattern)
    };

    const selectedMenu = menus[category];

    if (selectedMenu) {
        await sock.sendMessage(chatId, { text: selectedMenu }, { quoted: message });
    } else {
        await sock.sendMessage(chatId, { text: "❌ *Category not found!*" }, { quoted: message });
    }
}

module.exports = windowCommand;
