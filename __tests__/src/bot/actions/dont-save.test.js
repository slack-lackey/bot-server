'use strict';

jest.mock('event-handlers');

const rootDir = process.cwd();
let dontsave = require(`${rootDir}/src/bot/actions/dont-save.js`);

const payload = {hi: 'hello'};

const respond = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } else {
    return false;
  }
};

describe('dont-save', () => {
  it('should not run without inputs', ()=> {
    expect(dontsave()).toBeNull();
  });
  it('Should return a response', () => {
    global.console = {log: jest.fn()};
    dontsave(payload, respond);
    expect(console.log).toBeCalled();
  });
});
