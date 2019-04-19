'use strict';

const getClientByTeamId = require('../../lib/web-api-helpers').getClientByTeamId;
const getToken = require('../../lib/web-api-helpers.js').getToken;

const superagent = require('superagent');
const moment = require('moment');
const db = require('../../database/gist-model.js');
const randomGif = require('../../lib/random-gif.js');
const blockSuccess = require('../../blocks/success.json');

module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}
  try{

    let file_id = payload.actions[0].value;

    let teamId = payload.user.team_id;
    const slack = getClientByTeamId(teamId); // get correct web client
    const token = getToken(teamId); // get token from local storage
    let file;
    console.log('success');

    slack.files.info({ 'token': token, 'file': file_id })
      .then((fileObj) => {
        file = fileObj;
        return slack.users.info({ 'token': token, 'user': file.file.user });
      })
      .then(userObj => {

        file.username = userObj.user.profile.display_name;

        // Make an object to send to the API server to save a Gist
        let title;
        if (file.file.name[0] === '-') {
          title = file.username.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() + '.' + file.file.name.split('.').pop();
        } else {
          title = file.file.name;
        }
        let description = `Created by ${file.username} on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`;
        let content = file.content;
        const gist = { title, description, content };

        // POST request to hosted API server which saves a Gist and returns a URL
        return superagent.post(`${process.env.BOT_API_SERVER}/createGist`).send(gist)
          .then((res) => {

            let obj = {
              title: title,
              author: file.username,
              date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
              channel: payload.channel.id,
              // keywords: message.keywords,
              user: payload.user.id,
              url: res.text,
            };

            db.post(obj);

            let block = blockSuccess;
            block[0].text.text = '*I saved your Gist!*\n\nHere is your URL if you want to share it with others.\n\n' + res.text + '\n\n';
            block[5].elements[0].value = res.text;
            // pick a random "success" gif
            block[2].image_url = randomGif();

            respond({
              blocks: block,
              replace_original: true,
            });

          })

          .catch((error) => {
            respond({ text: 'Sorry, there\'s been an error. Try again later.', replace_original: true });
          });

      });
  } 
  catch(error) {
    return null;
  }
};
