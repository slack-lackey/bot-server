'use strict';

const cwd = process.cwd();

const { WebClient } = require('@slack/web-api');
const LocalStorage = require('node-localstorage').LocalStorage;

const botAuthorizationStorage = new LocalStorage(`${cwd}/storage`);


// *************************
// Helper Functions

const clients = {};
const getClientByTeamId = (teamId) => {
  if (!clients[teamId] && botAuthorizationStorage.getItem(teamId)) {
    clients[teamId] = new WebClient(botAuthorizationStorage.getItem(teamId));
  }
  if (clients[teamId]) {
    return clients[teamId];
  }
  return null;
};

const getToken = (teamId) => {
  return botAuthorizationStorage.getItem(teamId);
};

module.exports = {getClientByTeamId, getToken};