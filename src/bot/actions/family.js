'use strict';

/**
 * Slack Interactive Message Hanlder — "family" action
 * Replaces previous interactive message 
 * @module src/bot/actions/about
 */


const aboutBlock = require('../../blocks/about.json');

/**
* Replaces previous interactive message with a JSON block message about the creators of the bot.
* @param payload {object} Payload object of Slack interactive message
* @param respond {function} Inherited method from the Slack interactive message API to replace a previous message
*/
module.exports = (payload, respond) => {
  if (!respond) { return null; }
  console.log('family ran successfully');
  let block = aboutBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
};
