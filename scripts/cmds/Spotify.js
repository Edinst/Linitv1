const axios = require("axios");

module.exports = {
  config: {
    name: "spotify",
    version: "1.0",
    author: "null",
    role: 0,
    countDown: 15, 
    shortDescription: "Search and share Spotify tracks.",
    longDescription: "Streaming music",
    category: "Music",
    guide: { 
      en:"{p}spotify <track name>"}
  },
  onStart: async function ({ message, event, args, api }) {
    const query = args.join(" ");     api.setMessageReaction("⏳", event.messageID, () => {}, true);
    const waitingMessage = await api.sendMessage(`🔎 | Searching for "${query}"\Please wait...`, event.threadID);

    try {
      const response = await axios.get(
        `https://spotify.teamjsus.repl.co/download?track=${encodeURIComponent(query)}`
      );

      if (response.status === 200) {
        const data = response.data;
        const {
          title,
          artist,
          uploadDate,
          album,
          size,
          duration,
          download,
          thumbnail,
        } = data;
        const trackInfo = `
🎵 Title: ${title}
🎤 Artist: ${artist}
🗓 Upload Date: ${uploadDate}
📀 Album: ${album}
📁 Size: ${size}
⏱ Duration: ${duration}
        `;
        await api.sendMessage(
          {
            body: trackInfo,
            attachment: await global.utils.getStreamFromURL(download),
          },
          event.threadID
        );
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        await api.unsendMessage(waitingMessage.messageID);
      } else {
        await api.sendMessage("Tidak dapat menemukan trek yang cocok.", event.threadID);
      }
    } catch (error) {
      console.error("Error:", error.message);
      await api.sendMessage("Terjadi kesalahan saat mencari trek.", event.threadID);
    }
  },
};