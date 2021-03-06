module.exports = {
  "_locale":{
    "id":"zh-mo",
    "name":"中國澳門",
    "label":"你好",
    "flag": "mo.svg"
  },
  "_global":require('./_global.json'),
  "_countries": require('./_countries.json'),
  "_sectors": require('./_sectors.json'),
  "_project-categories": require('./_project-categories.json'),
  "about": Object.assign({}, require('./_global.json'), require('./about.json')),
  "how": Object.assign({}, require('./_global.json'), require('./how.json')),
  "contact": Object.assign({}, require('./_global.json'), require('./contact.json')),
  "sponsors": Object.assign({}, require('./_global.json'), require('./sponsors.json')),
  "home": Object.assign({}, require('./_global.json'), require('./home.json')),
  "schedule": Object.assign({}, require('./_global.json'), require('./schedule.json')),
  "ambassadors": Object.assign({}, require('./_global.json'), require('./ambassadors.json')),
  "registration": Object.assign({}, require('./_global.json'), require('./registration.json')),
}