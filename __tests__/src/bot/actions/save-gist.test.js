'use strict';

const rootDir = process.cwd();
let saveGist = require(`${rootDir}/src/bot/actions/save-gist.js`);

let payload = { type: 'block_actions',
  team: { id: 'THF13BXTL', domain: 'slacklackey' },
  user:
   { id: 'UHL424Y9F',
     username: 'chris.merritt95',
     name: 'chris.merritt95',
     team_id: 'THF13BXTL' },
  api_app_id: 'AHVHAFG8Y',
  token: 'T294VsZsBYPKm2QOOYYtwMqA',
  container:
   { type: 'message_attachment',
     message_ts: '1555635962.009200',
     attachment_id: 1,
     channel_id: 'CJ342C8K0',
     is_ephemeral: true,
     is_app_unfurl: false },
  trigger_id: '613059582389.593037405938.de831137886182b5dba1850ed8851eba',
  channel: { id: 'CJ342C8K0', name: 'thursdaytest' },
  response_url:
   'https://hooks.slack.com/actions/THF13BXTL/615269420742/5LNBFr3CSlfkCwbxs13CLFWN',
  actions:
   [ { action_id: 'save_gist',
     block_id: 'jzi',
     text: [Object],
     value:
        '{"client_msg_id":"b0521885-acf5-4056-aba6-2ec88a83dbf4","type":"message","text":"```hi```","user":"UHL424Y9F","ts":"1555635958.009000","channel":"CJ342C8K0","event_ts":"1555635958.009000","channel_type":"channel","username":"Chris Merritt"}',
     type: 'button',
     style: 'primary',
     action_ts: '1555635967.232297' } ] };
const respond = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } else {
    return false;
  }
};

describe('help.js', ()=> {
  it('Should return null with no inputs', ()=> {
    expect(saveGist()).toBeNull();
  }),
  it('Should log success on success', () => {
    const spy = jest.spyOn(console, 'log');
    saveGist(payload, respond);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});