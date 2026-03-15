const axios = require('axios');

async function surahCommand(sock, chatId, message, args) {
    const surahNumber = args[0];

    if (!surahNumber || isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        return await sock.sendMessage(chatId, { 
            text: "📖 *Please provide a Surah number (1-114).*\nExample: `.surah 70`" 
        }, { quoted: message });
    }

    try {
        await sock.sendMessage(chatId, { react: { text: '⏳', key: message.key } });

        // 1. Fetch Arabic and English versions at the same time
        const [arRes, enRes] = await Promise.all([
            axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.quran-uthmani`),
            axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`)
        ]);

        const surahAr = arRes.data.data;
        const surahEn = enRes.data.data;

        // 2. Build the Header
        let responseText = `*🕋 Quran Surah 🕋*\n\n`;
        responseText += `📖 *Surah ${surahNumber}:* ${surahAr.name}\n`;
        responseText += `*(${surahAr.englishName} - ${surahAr.englishNameTranslation})*\n\n`;
        responseText += `💫 *Type:* ${surahAr.revelationType.toLowerCase()}\n`;
        responseText += `✅ *Ayahs:* ${surahAr.numberOfAyahs}\n\n`;
        responseText += `🔮 *Verses*\n\n`;

        // 3. Loop through Ayahs and combine Arabic + English
        surahAr.ayahs.forEach((ayah, index) => {
            const enText = surahEn.ayahs[index].text;
            // Remove the Bismillah from the first verse if it's not Surah Fatiha 
            // to keep the formatting clean like your example
            let arText = ayah.text;
            if (surahNumber !== "1" && index === 0) {
                arText = arText.replace(/^(.*?)([\u0628][\u0633][\u0645].*?[\u0627][\u0644][\u0631][\u062D][\u0645][\u0646].*?[\u0627][\u0644][\u0631][\u062D][\u064A][\u0645])/g, "");
            }

            responseText += `${index + 1}. ${arText.trim()}\n`;
            responseText += `➡️ ${enText}\n\n`;
        });

        // 4. Send the long text message
        // Note: If the surah is very long (like Al-Baqarah), 
        // WhatsApp might truncate it, but for Surah 70 it works perfectly.
        await sock.sendMessage(chatId, { text: responseText }, { quoted: message });

        // 5. Send Audio (Optional - keep this if you still want the voice)
        const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
        await sock.sendMessage(chatId, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: message });

        await sock.sendMessage(chatId, { react: { text: '✅', key: message.key } });

    } catch (error) {
        console.error('Quran API Error:', error);
        await sock.sendMessage(chatId, { text: '❌ Error: Could not fetch the Surah verses.' });
    }
}

module.exports = surahCommand;
