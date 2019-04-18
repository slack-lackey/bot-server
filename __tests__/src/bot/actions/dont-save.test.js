'use strict';

const rootDir = process.cwd();
let dontsave = require(`${rootDir}/src/bot/actions/dont-save.js`);

describe('dont-save', () => {
  it('should not run without inputs', ()=> {
    expect(dontsave()).toBeNull();
  });
});
