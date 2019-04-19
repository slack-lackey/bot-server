'use strict';

module.exports = (payload, respond) => {
  console.log('**** RESPOND:',respond);
  if(!payload || !respond){return null;}
  else{
    respond({
      text: `Ok, I won't save it. If you change your mind, send your code (as a snippet or inside 3 backticks) to this channel again.`,
      replace_original: true,
    });
    
  }
};
