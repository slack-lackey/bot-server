'use strict';

const aboutBlock = require('../../blocks/about.json');


module.exports = (payload, respond) => {
  if (!respond) { return null; }
  else {
    let block = aboutBlock;
    respond({
      blocks: block,
      replace_original: true,
    });
    return {
      text: 'Processing...',
    };
  }
};
