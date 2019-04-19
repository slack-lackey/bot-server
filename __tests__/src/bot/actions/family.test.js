'use strict';

const rootDir = process.cwd();
let family = require(`${rootDir}/src/bot/actions/family.js`);

const payload = {hi: 'hello'};

const respond = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } else {
    return false;
  }
};


describe('family.js', () => {
  it('returns null if called with no respond parameter', () => {
    expect(family()).toBeNull();
  });
  
  it('returns a response if called properly', () => {
    const spy = jest.spyOn(console, 'log');
    family(payload, respond);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});
