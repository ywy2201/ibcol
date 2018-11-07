module.exports = {
  "_locale": {
    "id": "en-gb",
    "name": "English",
    "label": "Welcome"
  },
  "_global": require('./_global.json'),
  "_countries": require('./_countries.json'),
  "_sectors": require('./_sectors.json'),
  "_project-categories": require('./_project-categories.json'),
  "about": Object.assign({}, require('./_global.json'), require('./about.json')),
  "how": Object.assign({}, require('./_global.json'), require('./how.json')),
  "contact": Object.assign({}, require('./_global.json'), require('./contact.json')),
  "sponsors": Object.assign({}, require('./_global.json'), require('./sponsors.json')),
  "competition": Object.assign({}, require('./_global.json'), require('./competition.json')),
  "home": Object.assign({}, require('./_global.json'), require('./home.json')),
  "schedule": Object.assign({}, require('./_global.json'), require('./schedule.json')),
  "students": Object.assign({}, require('./_global.json'), require('./students.json')),
  "registration": Object.assign({}, require('./_global.json'), require('./registration.json')),
}