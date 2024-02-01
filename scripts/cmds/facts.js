const axios = require('axios');

module.exports = {
  config: {
    name: 'fact',
    version: '1.0',
    author: 'Riley Nelson',
    role: 0,
    shortDescription: 'Get a random interesting fact',
    category: 'Fun',
    guide: '{p}fact',
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://uselessfacts.jsph.pl/random.json');
      
      if (response.status === 200 && response.data && response.data.text) {
        api.sendMessage(`📚 Fact: ${response.data.text}`, event.threadID);
      } else {
        api.sendMessage('Unable to fetch a fact at the moment.', event.threadID);
      }
    } catch (error) {
      api.sendMessage('An error occurred while fetching the fact.', event.threadID);
    }
  },
};