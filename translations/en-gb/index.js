module.exports = {
  "_locale": {
    "id": "en-gb",
    "name": "English",
    "label": "Welcome"
  },
  "_global": require('./global.json'),
  "about": Object.assign({}, require('./global.json'), require('./about.json')),
  "contact": Object.assign({}, require('./global.json'), require('./contact.json')),
  "corporate-relations": Object.assign({}, require('./global.json'), require('./corporate-relations.json')),
  "criteria": Object.assign({}, require('./global.json'), require('./criteria.json')),
  "home": Object.assign({}, require('./global.json'), require('./home.json')),
  "schedule": Object.assign({}, require('./global.json'), require('./schedule.json')),
  "student-relations": Object.assign({}, require('./global.json'), require('./student-relations.json')),
}