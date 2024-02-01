module.exports = {
  config: {
    name: 'botteam',
    version: '1.0',
    author: 'رايلي نيلسون',
    shortDescription: '',
    category: 'fun',
    guide: '{pn}',
  },
  onStart: async function ({ message }) {
    return message.reply('1. Zenith nova\n2. Lina marina\n3. Ethan luna\n4. Amiya\n5. Miku');
  }
};