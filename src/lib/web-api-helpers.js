'use strict';

const cwd = process.cwd();

const { WebClient } = require('@slack/web-api');
const LocalStorage = require('node-localstorage').LocalStorage;

const botAuthorizationStorage = new LocalStorage(`${cwd}/storage`);


// *************************
// Helper Functions

const clients = {};
/**Get the clients by the team id.
 * @param  {} teamId
 * @returns A new authorized client.
 */
const getClientByTeamId = (teamId) => {
  if (!clients[teamId] && botAuthorizationStorage.getItem(teamId)) {
    clients[teamId] = new WebClient(botAuthorizationStorage.getItem(teamId));
  }
  if (clients[teamId]) {
    return clients[teamId];
  }
  return null;
};
/**Get the slack auth token
 * @param  {} teamId
 * @returns  {} Returns the auth token.
 */
const getToken = (teamId) => {
  return botAuthorizationStorage.getItem(teamId);
};

module.exports = {getClientByTeamId, getToken};