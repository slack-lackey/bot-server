'use strict';

const helpBlock = require('../../blocks/help.json');

module.exports = (payload, respond) => {
  let block = helpBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
};
