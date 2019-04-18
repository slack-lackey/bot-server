// 'use strict';

// console.log('got here to get-client.js');
// const cwd = process.cwd();
// const { WebClient } = require('@slack/web-api');
// // const WebClient  = require('../server.js').WebClient;

// const LocalStorage = require('node-localstorage').LocalStorage;
// const botAuthorizationStorage = new LocalStorage('../../storage');

// const clients = require(`../server.js`);
// console.log('CLIENTS:', clients);

// module.exports = (teamId) =>  {
//   if (!clients[teamId] && botAuthorizationStorage.getItem(teamId)) {
//     clients[teamId] = new WebClient(botAuthorizationStorage.getItem(teamId));
//   }
//   if (clients[teamId]) {
//     return clients[teamId];
//   }
//   return null;
// };
