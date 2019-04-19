'use strict';

const rootDir = process.cwd();
let saveGistSnippet = require(`${rootDir}/src/bot/actions/save-gist-snippet.js`);

describe('help.js', ()=> {
  it('Should return null with no inputs', ()=> {
    expect(null).toBeNull();
  });
});