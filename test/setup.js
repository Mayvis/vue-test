require('jsdom-global')();

window.Date = Date;
global.Date = Date;

global.expect = require('expect');