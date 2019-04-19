'use strict';

/**
 * Slack Interactive Message Hanlder — "help" action
 * Replaces previous interactive message with new text.
 * @module src/bot/actions/help
 */


const helpBlock = require('../../blocks/help.json');
 
/**
* Replaces Slack interactive message with the "help" JSON block message
* @param payload {object} Payload object of Slack interactive message
* @param respond {function} Inherited method from the Slack interactive message API to replace a previous message
*/
module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}
  console.log('help ran successfully');
  let block = helpBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
};
