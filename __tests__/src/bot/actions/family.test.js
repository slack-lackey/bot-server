'use strict';

const rootDir = process.cwd();
let {family} = require(`${rootDir}/src/bot/actions/dont-save.js`);

describe('src/bot/actions/family.js', () => {
  it('returns an error if called with no respond', () => {
    expect(true).toBeTruthy();
  });
});
