'use strict';

const aboutBlock = require('../../blocks/about.json');


module.exports = (payload, respond) => {
  let block = aboutBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
};
