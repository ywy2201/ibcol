import _ from 'lodash';

import translations from 'translations';



const translate = (key, page, locale, extras) => {
  
  // console.log('translate', key, page, locale);

  const localeSupported = _.find(translations, {
    _locale: {
      id: locale
    }
  }) !== undefined;

  if (!localeSupported)
    locale = "_default";

  let db = Object.assign({}, translations[locale][page]);

  if (!_.isEmpty(extras)) {
    // console.log('extras', extras);
    Object.keys(extras).map((extra)=>{
      db = Object.assign({}, db, translations[locale][`_${extra}`]);
      // console.log('db', db);
    })
  }

  db._locale = translations[locale]['_locale'];

  
  
  // TODO: 
  const translated = _.get(db, key)
  return _.isEmpty(translated) ? _.get(translations['_default'][page], key) : translated;
  
  

}

export default translate;