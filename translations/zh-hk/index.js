module.exports = {
  "_locale": {
    "id": "zh-hk",
    "name": "䌓體中文",
    "label": "歡迎"
  },
  "_global": require('./global.json'),
  "_countries": require('./countries.json'),
  "_sectors": require('./sectors.json'),
  "_project-categories": require('./project-categories.json'),
  "about": Object.assign({}, require('./global.json'), require('./about.json')),
  "contact": Object.assign({}, require('./global.json'), require('./contact.json')),
  "corporate-relations": Object.assign({}, require('./global.json'), require('./corporate-relations.json')),
  "criteria": Object.assign({}, require('./global.json'), require('./criteria.json')),
  "home": Object.assign({}, require('./global.json'), require('./home.json')),
  "schedule": Object.assign({}, require('./global.json'), require('./schedule.json')),
  "student-relations": Object.assign({}, require('./global.json'), require('./student-relations.json')),
}