'use strict';

module.exports = exports = {};

// const respond = (obj) => {
//   if (typeof obj === 'object') {
//     return true;
//   } else {
//     return false;
//   }
// };

exports.dontSave = (payload, respond) => {

  if(!payload || !respond) {
    return null;
  } else {
    return respond({hi: 'hello'});
  }


  // if(!payload || !respond){return null;}
  // else{
  //   return respond({
  //     text: `Ok, I won't save it. If you change your mind, send your code (as a snippet or inside 3 backticks) to this channel again.`,
  //     replace_original: true,
  //   });
  // }
};

// exports.family = (payload, respond) => {

// }