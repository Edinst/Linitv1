module.exports = {
  config: {
    name: 'bot',
    version: '1.0',
    author:  '©EdiNST II',
    shortDescription: '',
    category: 'fun',
    guide: '{pn}',
  },
  onStart: async function ({ message }) {
    return message.reply('yes?');
  }
};