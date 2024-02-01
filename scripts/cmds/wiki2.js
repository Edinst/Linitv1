const axios = require("axios");

module.exports = {
  config: {
  name: "wiki2",
  version: "1.0",
  role: 0,
  author: "ViLLAVER",
  credits: "Blue",
  description: "Get information about historical events or topics.",
  category: "education",
  cooldowns: 5, 
},
onStart: async function (){},
onChat: async function ({ api, event, args }) {
  const input = event.body;
  if(input && input.trim().toLowerCase().startsWith('wikipedia')){
    const data = input.split(" ");
    data.shift();
    const searchQuery = data.join(" ");

  if (!searchQuery) {
    return api.sendMessage("Please provide a search query (e.g., history World War 3).", event.threadID);
  }

  try {
    const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`);

    if (response.data.title && response.data.extract) {
      const title = response.data.title;
      const extract = response.data.extract;

      api.sendMessage(`Information about "${title}":\${extract}`, event.threadID);
    } else {
      api.sendMessage(`No information found for "${searchQuery}".`, event.threadID);
    }
  } catch (error) {
    console.error("Error fetching historical information:", error);
    api.sendMessage("An error occurred while fetching historical information.", event.threadID);
  }
}
}
};