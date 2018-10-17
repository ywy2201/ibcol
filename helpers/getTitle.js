import _ from 'lodash';
import configs from 'configs';
import translate from 'helpers/translate.js';

const getTitle = (pageHeading, locale) => {

  // console.log('translate', translatable, locale);

  let title = "";


  if (Array.isArray(pageHeading)) {
    title = pageHeading.reduce((_title, token) => {
      return _.isEmpty(_title) ?
        `${translate(token, locale)}`
        :
        `${translate(token, locale)} ‹ ${_title}`;
    })
  } else {
    title = translate(pageHeading, locale);
  }


  return `${title} | ${translate(configs.siteTitle, locale)}`;

}

export default getTitle;