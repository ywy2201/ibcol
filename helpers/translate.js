import _ from 'lodash';
import configs from 'configs';

const translate = (translatable, locale) => {

  // console.log('translate', translatable, locale);

  if (typeof (translatable) === 'string')
    return translatable;

  if (_.isEmpty(translatable))
    return "";

  let translated = translatable[locale];

  // console.log('translated', translated);

  if (_.isEmpty(translated))
    translated = translatable[configs.locales[0].id];

  return translated === undefined ? "" : translated;

}

export default translate;