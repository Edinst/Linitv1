module.exports = {
  config: {
    name: 'team',
    version: '1.0',
    author:  '©EdiNST II',
    shortDescription: '',
    category: 'fun',
    guide: '{pn}',
  },
  onStart: async function ({ message }) {
    return message.reply('1. Edi nst II\n2. Riley noson\n3. Luxion\n4. Loufi\n5. Japanese nickname');
  }
};