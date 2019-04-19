'use strict';

const superagent = require('superagent');
const moment = require('moment');
const db = require('../../database/gist-model.js');
const randomGif = require('../../lib/random-gif.js');
const blockSuccess = require('../../blocks/success.json');


module.exports = (payload, respond) => {
  if(!payload || !respond){return null;}

  // Get the original message object (with the future Gist's content)
  const message = JSON.parse(payload.actions[0].value);

  // Make an object to send to the API server to save a Gist
  let title = message.username.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() + '.js';
  let description = `Created by ${message.username} on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`;
  let content = message.text.slice(message.text.indexOf('```') + 3, message.text.lastIndexOf('```'));
  const gist = { title, description, content };
  console.log('GIST:', gist);

  // POST request to hosted API server which saves a Gist and returns a URL
  return superagent.post(`${process.env.BOT_API_SERVER}/createGist`)
    .send(gist)
    .then((res) => {

      let obj = {
        title: title,
        author: message.username,
        date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        channel: message.channel,
        keywords: message.keywords,
        user: message.user,
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

      respond({
        text: 'I saved it as a gist for you. You can find it here:\n' + res.text,
        replace_original: true,
      });

    })

    .catch((error) => {
      respond({ text: 'Sorry, there\'s been an error. Try again later.', replace_original: true });
    });

};
