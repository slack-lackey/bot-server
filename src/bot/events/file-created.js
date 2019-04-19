'use strict';

/**
 * Slack Event Hanlder — "file-created" Event
 * Fired when a snippet file is created in Slack
 * @module src/bot/events/file-created
 */

const blockOne = require('../../blocks/block-1.json');
const getClientByTeamId = require('../../lib/web-api-helpers').getClientByTeamId;
const getToken = require('../../lib/web-api-helpers.js').getToken;
/**When a snippet is created, this function runs.
 * @param  {} fileEvent
 * @param  {} body
 * @returns A message to the slack channel.
 */
module.exports = (fileEvent, body) => {
  if(!fileEvent || !body){return null;}

  console.log('file created successfully');

  let teamId = body.team_id;
  const slack = getClientByTeamId(teamId); // get correct web client
  const token = getToken(teamId); // get token from local storage

  return slack.files.info({ 'token': token, 'file': fileEvent.file_id })
    .then(file => {

      // only acts on created snippets
      if (file.file.mode === 'snippet') {

        // get block, add file id and change "save" button's action_id
        let block = blockOne;
        block.blocks[0].elements[0].value = fileEvent.file_id;
        block.blocks[0].elements[0].action_id = 'save_gist_snippet';

        // Send a "Visible only to you" message with "save"/"don't save" buttons
        slack.chat.postEphemeral({
          token: token,
          channel: file.file.channels[0],
          text: `Hey, <@${file.file.user}>, I saw that you shared a code snippet!\n\n*Do you want to save it as a Gist on GitHub?*\n\n*Reminder:* _Did you give your code snippet a "Title"? If not you can go add one by clicking the :pencil2: to the right of your snippet message and editing the file_`,
          user: file.file.user,
          attachments: [
            block,
          ],
        });
      }
    })

    .catch(err => console.error(err));
};
