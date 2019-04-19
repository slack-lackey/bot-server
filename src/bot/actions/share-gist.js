'use strict';

/**
 * Slack Interactive Message Hanlder — "share-gist" action
 * Handles sharing a Gist link publically to the channel upon user input in a Slack interactive message
 * @module src/bot/actions/share-gist
 */

const getClientByTeamId = require('../../lib/web-api-helpers').getClientByTeamId;
const getToken = require('../../lib/web-api-helpers.js').getToken;
/**Checks if a gist has been shared.
 * @param  {} payload
 * @param  {} respond
 * @returns Sends a message to the channel.
 */
module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}
  console.log('Gist shared correctly.');
  let teamId = payload.user.team_id;
  const slack = getClientByTeamId(teamId); // get correct web client
  const token = getToken(teamId); // get token from local storage
  slack.chat.postMessage({
    token: token,
    channel: payload.channel.id,
    text: '<@' + payload.user.id + '> shared this Gist with the channel:\n' + payload.actions[0].value,
  });

};
