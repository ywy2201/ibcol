const geoip = require('geoip-lite');

const translations = require('../translations');
const translationsMapping = require('../translationsMapping');

const defaultLocale = translations['_default']._locale;


const getLocaleObject = (requestedLocale) => {
  const requestedLocaleObject = _.find(translations, {
    _locale: {
      id: requestedLocale
    }
  });

  if (requestedLocaleObject !== undefined) {
    if (process.env.ENV === 'production') {
      // check to see if requestedLocaleObject has been disabled
      if (requestedLocaleObject._locale.disabled === true) {
        return undefined
      }
    }
  }

  return requestedLocaleObject;
}

const findDefaultPath = (req) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let geo = geoip.lookup(ip);

  if (geo === null) {
    return `/${defaultLocale.id}`;
  }

  let id = translationsMapping[geo.country];

  if(id === undefined) {
    return `/${defaultLocale.id}`;
  }
  
  const requestedLocaleObject = getLocaleObject(id);
  const requestedLocaleSupported = requestedLocaleObject !== undefined;

  if(requestedLocaleSupported !== undefined) {
    return `/${id}`;
  }

  return `/${defaultLocale.id}`;


}



module.exports = {
  findDefaultPath,
  getLocaleObject
};