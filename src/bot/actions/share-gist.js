'use strict';

const getClientByTeamId = require('../../lib/web-api-helpers').getClientByTeamId;
const getToken = require('../../lib/web-api-helpers.js').getToken;

module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}
  let teamId = payload.user.team_id;
  const slack = getClientByTeamId(teamId); // get correct web client
  const token = getToken(teamId); // get token from local storage
  console.log('Gist shared.');
  slack.chat.postMessage({
    token: token,
    channel: payload.channel.id,
    text: '<@' + payload.user.id + '> shared this Gist with the channel:\n' + payload.actions[0].value,
  });

};
