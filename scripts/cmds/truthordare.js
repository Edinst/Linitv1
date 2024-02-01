const axios = require('axios');

async function fetchDataFromAPI(url) {
  try {
    const response = await axios.get(url);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    return null;
  }
}

async function translateText(text) {
  try {
    const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const response = await axios.get(translateUrl);
    const translatedText = response.data[0][0][0];
    return translatedText;
  } catch (error) {
    console.error('Error translating text:', error.message);
    return null;
  }
}

module.exports = {
  config: {
    name: "truthordare",
    aliases: ["tod"],
    version: "1.0",
    author: "Samir",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Play truth or dare."
    },
    longDescription: {
      en: "Challange Yourself With Random Truth And Dares..."
    },
    category: "game",
    guide: {
      en: "{pn} [truth/t] or {pn} [dare/d]"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    if (args.length < 1) {
      return api.sendMessage("Incorrect syntax!", threadID, messageID);
    }

    const type = args[0].toLowerCase();
    const allTypes = ["truth", "t", "dare", "d"];

    if (!allTypes.includes(type)) {
      return api.sendMessage("Incorrect syntax!", threadID, messageID);
    }

    const apiUrl =
      type === "truth" || type === "t"
        ? "https://api.zahwazein.xyz/entertainment/truth?apikey=zenzkey_92d341a7630e"
        : "https://api.zahwazein.xyz/entertainment/dare?apikey=zenzkey_92d341a7630e";

    try {
      const question = await fetchDataFromAPI(apiUrl);

      if (question) {
        const translatedQuestion = await translateText(question);

        if (translatedQuestion) {
          return api.sendMessage(translatedQuestion, threadID, messageID);
        } else {
          return api.sendMessage(
            "Failed to translate the question.",
            threadID,
            messageID
          );
        }
      } else {
        return api.sendMessage(
          "Failed to fetch truth or dare question from API.",
          threadID,
          messageID
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
      return api.sendMessage(
        "Failed to fetch truth or dare question from API.",
        threadID,
        messageID
      );
    }
  },
};
