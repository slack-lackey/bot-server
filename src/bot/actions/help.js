'use strict';

const helpBlock = require('../../blocks/help.json');

module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}
  console.log('help ran successfully');
  let block = helpBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
};
