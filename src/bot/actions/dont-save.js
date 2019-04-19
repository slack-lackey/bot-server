'use strict';

module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}
  console.log('dont-save ran successfully');
  respond({
    text: `Ok, I won't save it. If you change your mind, send your code (as a snippet or inside 3 backticks) to this channel again.`,
    replace_original: true,
  });
    
};
