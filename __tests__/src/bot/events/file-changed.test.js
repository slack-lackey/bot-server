'use strict';

const rootDir = process.cwd();
let fileChanged = require(`${rootDir}/src/bot/events/file-changed.js`);


let fileEvent = { type: 'file_change',
  file_id: 'FJ14GA9CG',
  user_id: 'UHL424Y9F',
  file: { id: 'FJ14GA9CG' },
  event_ts: '1555638340.117800' };

let body = { token: 'T294VsZsBYPKm2QOOYYtwMqA',
  team_id: 'THF13BXTL',
  api_app_id: 'AHVHAFG8Y',
  event:
   { type: 'file_change',
     file_id: 'FJ14GA9CG',
     user_id: 'UHL424Y9F',
     file: { id: 'FJ14GA9CG' },
     event_ts: '1555638340.117800' },
  type: 'event_callback',
  event_id: 'EvJ0GQ6VCL',
  event_time: 1555638340,
  authed_users: [ 'UHZ3J65K9' ] };

describe('file-changed.js', () => {
  it('should not run without inputs', ()=> {
    expect(fileChanged()).toBeNull();
  });
  xit('should log on success', ()=> {
    const spy = jest.spyOn(console, 'log');
    fileChanged(fileEvent, body);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});