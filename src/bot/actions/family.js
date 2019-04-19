'use strict';

const aboutBlock = require('../../blocks/about.json');


module.exports = (payload, respond) => {
  if (!respond) { return null; }
  console.log('family ran successfully');
  let block = aboutBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
};
