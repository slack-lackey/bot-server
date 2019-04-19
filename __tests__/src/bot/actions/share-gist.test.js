'use strict';

const rootDir = process.cwd();
let shareGist = require(`${rootDir}/src/bot/actions/share-gist.js`);

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
   { type: 'message',
     message_ts: '1555637320.009500',
     channel_id: 'CJ342C8K0',
     is_ephemeral: true },
  trigger_id: '613145588576.593037405938.10e7fb66b7341a9955bdc7a4c1853575',
  channel: { id: 'CJ342C8K0', name: 'thursdaytest' },
  response_url:
   'https://hooks.slack.com/actions/THF13BXTL/601719210914/JjqEglx3waPx17x9zhhoU29J',
  actions:
   [ { action_id: 'share_gist_to_channel',
     block_id: '/24A',
     text: [Object],
     value:
        'https://gist.github.com/SlackLackey/4276a3b74b92fa95b0deb27617fd7e17',
     type: 'button',
     action_ts: '1555637326.423234' } ] };
     
const respond = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } else {
    return false;
  }
};

describe('share-gist.js', ()=> {
  it('Should return null with no inputs', ()=> {
    expect(shareGist()).toBeNull();
  });
  xit('Should log on success', () => {
    const spy = jest.spyOn(console, 'log');
    shareGist(payload, respond);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});