import _ from 'lodash';

import translations from 'translations';



const translate = (key, page, locale) => {
  
  // console.log('translate', key, page, locale);

  const localeSupported = _.find(translations, {
    _locale: {
      id: locale
    }
  }) !== undefined;

  if (!localeSupported)
    locale = "_default";
  
  
  return _.get(translations[locale][page], key, _.get(translations['_default'][page], key));
  
  

}

export default translate;