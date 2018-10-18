const envConfigs = {
  "common": require('./common.json'),
  "local": require('./local.json'),
  "dev": require('./dev.json'),
  "stage": require('./stage.json'),
  "production": require('./production.json')
}


const currentEnv = (process.env.ENV) || 'local';

module.exports = Object.assign({}, envConfigs['common'], envConfigs[currentEnv]);
