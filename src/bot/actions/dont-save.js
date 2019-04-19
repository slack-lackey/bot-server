'use strict';

/**
 * Slack Interactive Message Hanlder — "dont-save" action
 * Replaces previous interactive message with new text.
 * @module src/bot/actions/dont-save
 */

 
/**
* Replaces Slack interactive message with a new message
* @param payload {object} Payload object of Slack interactive message
* @param respond {function} Inherited method from the Slack interactive message API to replace a previous message
*/
module.exports = (payload, respond) => {
  if (!payload || !respond) { return null; }
  console.log('dont-save ran successfully');
  respond({
    text: `Ok, I won't save it. If you change your mind, send your code (as a snippet or inside 3 backticks) to this channel again.`,
    replace_original: true,
  });

};
