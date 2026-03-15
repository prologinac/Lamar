const settings = {
  // Bot Basic Info - Linked to Render Environment Variables
  packname: process.env.PACK_NAME || '❖Ƭʜᴇ〲ᴹᵃᶠⁱᵃ࿐',
  author: process.env.AUTHOR || 'DELACRUZ',
  botName: process.env.BOT_NAME || "balckthrone",
  botOwner: process.env.OWNER_NAME || 'La Madrin',
  ownerNumber: process.env.OWNER_NUMBER || '255780309253',
  
  // Bot Version & Mode
  version: "8.3.0",
  commandMode: process.env.MODE || "public",
  mode: process.env.MODE || "public",
  
  // API Keys
  giphyApiKey: process.env.GIPHY_API || 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
  
  // Storage Settings
  maxStoreMessages: 20, 
  storeWriteInterval: 10000,
  
  // Bot Description
  description: "This is a bot for managing group commands and automating tasks.",
  
  // Update Settings
  updateZipUrl: "https://github.com/prologinac/lamar/archive/refs/heads/main.zip",
  
  // Channel & Group Settings
  newsletterJid: "120363402325089913@newsletter",
  mainChannel: "https://whatsapp.com/channel/0029Vb7mCrPAjPXDAkSngv45",
  stbChannel: "https://whatsapp.com/channel/0029Vb7mCrPAjPXDAkSngv45",
  logoChannel: "https://whatsapp.com/channel/0029VbBmFT430LKO7Ch9C80X",
  
  // Group Links
  botUserGroup: "https://chat.whatsapp.com/Jt6k5cmqPFi34423P7G4fI",
  silaTechGroup: "https://chat.whatsapp.com/Jt6k5cmqPFi34423P7G4fI",
  
  // Auto Reactions
  autoReactions: {
    adminReaction: "🐢",
    channelReaction: ["❤️", "🔥", "😍", "👍", "🎉", "🚀", "💯", "👑", "⭐", "💫"],
    userReaction: ["👍", "❤️", "😊", "😂", "🎈", "👏", "💝", "🤝", "🙌", "💖"]
  },
  
  // Auto Bio - Keep your 10 random bios
  autoBio: [
    '🐢 sɪʟᴀ ᴍᴅ ʙᴏᴛ | ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɪʟᴀ ᴛᴇᴄʜ',
    '🤖 ᴀᴜᴛᴏᴍᴀᴛᴇᴅ ᴀssɪsᴛᴀɴᴛ | sɪʟᴀ ᴍᴅ ᴠ3',
    '🚀 ʙᴏᴛ ᴀᴄᴛɪᴠᴇ | sɪʟᴀ ᴛᴇᴄʜ sᴇʀᴠɪᴄᴇs',
    '💫 sɪʟᴀ ᴍᴅ ᴍɪɴɪ | ɢʀᴏᴜᴘ ᴍᴀɴᴀɢᴇᴍᴇɴᴛ',
    '🎯 ᴀɪ ᴘᴏᴡᴇʀᴇᴅ ʙᴏᴛ | sɪʟᴀ ᴛᴇᴄʜ',
    '⚡ ғᴀsᴛ & ᴇғғɪᴄɪᴇɴᴛ | sɪʟᴀ ᴍᴅ ʙᴏᴛ',
    '🔧 24/7 ᴀᴄᴛɪᴠᴇ | sɪʟᴀ ᴛᴇᴄʜ sᴜᴘᴘᴏʀᴛ',
    '🌟 ᴘʀᴇᴍɪᴜᴍ ʙᴏᴛ | sɪʟᴀ ᴍᴅ sᴇʀᴠɪᴄᴇs',
    '📱 ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ | sɪʟᴀ ᴛᴇᴄʜ ᴠ3',
    '🎮 ᴍᴜʟᴛɪ-ғᴜɴᴄᴛɪᴏɴ | sɪʟᴀ ᴍᴅ ʙᴏᴛ'
  ],
  
  // Auto Replies - Your custom Swahili & English greetings
  autoReplies: {
    'hsssi': '𝙷𝚎𝚕𝚕𝚘! 👋',
    'magshsmbo': '𝙿𝚘𝚊 𝚜𝚊𝚗𝚊! 👋 𝙽𝚒𝚔𝚞𝚜𝚊𝚒𝚍𝚒𝚎 𝙺𝚞𝚑𝚞𝚜𝚞?',
    'hezzy': '𝙷𝚎𝚢 𝚝𝚑𝚎𝚛𝚎! .',
    'vnajsip': '𝙷𝚎𝚕𝚕𝚘 𝚅𝙸𝙿! 👑 𝙷𝚘𝚠 𝚌𝚊𝚗 𝙸 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞?',
    'mkaasuu': '𝙷𝚎𝚢 𝚖𝚔𝚞𝚞! 👋 𝙽𝚒𝚔𝚞𝚜𝚊𝚒𝚍𝚒𝚎 𝙺𝚞𝚑𝚞𝚜𝚞?',
    'boszhzs': '𝚈𝚎𝚜 𝚋𝚘𝚜𝚜! 👑 𝙷𝚘𝚠 𝚌𝚊𝚗 𝙸 𝚑𝚎𝚕𝚙 𝚢𝚘𝚞?',
    'habhshsari': '𝙽𝚣𝚞𝚛𝚒 𝚜𝚊𝚗𝚊! 👋 𝙷𝚊𝚋𝚊𝚛𝚒 𝚢𝚊𝚔𝚘?',
    'hellshsjjsjo': '𝙷𝚒 𝚝𝚑𝚎𝚛𝚎! ',
    'botjzj': '𝚈𝚎𝚜, 𝙸 𝚊𝚖 𝚂𝙸𝙻𝙰 𝙼𝙳 𝙼𝙸𝙽𝙸! 🤖 𝙷𝚘𝚠 𝚌𝚊𝚗 𝙸 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞?',
    'mezhznu': '𝚃𝚢𝚙𝚎 .𝚖𝚎𝚗𝚞 𝚝𝚘 𝚜𝚎𝚎 𝚊𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜! 📜',
    'ownzzer': '𝙲𝚘𝚗𝚝𝚊𝚌𝚝 𝚘𝚠𝚗𝚎𝚛 𝚞𝚜𝚒𝚗𝚐 .𝚘𝚠𝚗𝚎𝚛 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 👑',
    'thzhzanks': '𝚈𝚘𝚞\'𝚛𝚎 𝚠𝚎𝚕𝚌𝚘𝚖𝚎! 😊',
    'thankjz you': '𝙰𝚗𝚢𝚝𝚒𝚖𝚎! '
  },
  
  // Command Prefix
  PREFIX: process.env.PREFIX || "."
};

module.exports = settings;
