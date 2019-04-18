'use strict';

const helpBlock = require('../../blocks/help.json');

module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}
  let block = helpBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
  return {
    text: 'Processing...',
  };
};
