const next = require('next')
const routes = require('./routes')
const _ = require('lodash');
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)
const parseArgs = require('minimist')
const url = require('url');
// const { join } = require('path');

const routeHelpers = require('./helpers/route');

//
// ─── GET CONFIGS ────────────────────────────────────────────────────────────────
//

// const envConfigs = {
//   "common": require('./configs/common.json'),
//   "local": require('./configs/local.json'),
//   "stage": require('./configs/stage.json'),
//   "production": require('./configs/production.json')
// }

// const currentEnv = process.env.ENV || 'local';

// const configs = Object.assign({}, envConfigs.common, envConfigs[currentEnv]);
const configs = require('./configs');
console.log('configs', configs);

const translations = require('./translations');

const defaultLocale = translations['_default']._locale;

//────────────────────────────────────────────────────────────────────────────────




//
// ─── GET PORT NUMBER ────────────────────────────────────────────────────────────
//

var argv = parseArgs(process.argv.slice(2))
// console.log(argv);
const port = argv.port || argv.p || process.env.PORT || 3000;
console.log(`Listening on port ${port}...`);

//────────────────────────────────────────────────────────────────────────────────



// With express
const express = require('express');

const server = express();

server.enable('strict routing');

// Create the router using the same routing options as the server.
const router = express.Router({
  caseSensitive: server.get('case sensitive routing'),
  strict: server.get('strict routing')
});

//
// ─── REDIRECTS FOR PREVIOUS SITE ROUTES ─────────────────────────────────────────
//

// router.get('/eng/*?', (req, res) => {
//   res.redirect(301, `/en-us`);
// });

// router.get('/tch/*?', (req, res) => {
//   res.redirect(301, `/zh-hk`);
// });

// router.get('/sch/*?', (req, res) => {
//   res.redirect(301, `/zh-cn`);
// });
//────────────────────────────────────────────────────────────────────────────────



// redirect to default locale
router.get('/', (req, res) => {
  res.redirect(routeHelpers.findDefaultPath(req));
});


router.get('/:locale/*?', (req, res, next) => {
  const urlObject = url.parse(req.url);
  const status = (process.env.ENV === 'production') ? 301 : 302;
  const search = _.isEmpty(urlObject.search) ? '' : urlObject.search;
  const requestedLocale = req.params.locale.toLowerCase();
  const requestedParams = (_.isEmpty(req.params['0'])) ? '' : `/${req.params['0']}`;

  

  if (requestedLocale === '_next' || requestedLocale === 'static' || requestedLocale === 'robots.txt') {
    next();
  } else {
    let newPath = "";    

    const requestedLocaleObject = routeHelpers.getLocaleObject(requestedLocale);

    
    const requestedLocaleSupported = requestedLocaleObject !== undefined;
    
    if (!requestedLocaleSupported) {
      // requestedLocale is not in the supported locale list

      // requestedLocale is not supported, requestedParams is correct?
      if (routes.findAndGetUrls(requestedParams, { locale: defaultLocale.id }).route !== undefined) {
        // requestedParams is found when default locale is used -> redirect to requestedParams with default locale
        newPath = `/${defaultLocale.id}${requestedParams}${search}`;
      } else {

        // maybe locale is missing and requestedLocale is really part of the requestedParams?

        newPath = `/${defaultLocale.id}/${requestedLocale}${requestedParams}${search}`;
      }

      


      // requestedLocale is missing, requestedParams is

      // is requestedParams a valid path?

      // requestedParams is supported (but requestedLocale is not supported)
      // -> render requestedParams under default locale

      // if is supported route, route to default locale

      if (process.env.ENV !== 'production')
        console.log(`       >> ${status}: ${newPath}`);

      res.redirect(status, newPath);
    } else {
      next();
    }

  }
});


//────────────────────────────────────────────────────────────────────────────────



//
// ─── MIDDLEWARE: ADD SLASH TO URL ────────────────────────────────────────────────
//


const addSlash = (req, res, next) => {
  const urlObject = url.parse(req.url);
  const search = _.isEmpty(urlObject.search) ? '' : urlObject.search;

  const pathTokens = urlObject.pathname.split('/');
  const status = (process.env.ENV === 'production') ? 301 : 302;

  // console.log('pathTokens', pathTokens);

  const inspectToken = pathTokens.pop();


  if (
    pathTokens[1] === '_next' ||
    inspectToken === '' ||
    inspectToken.indexOf('.') !== -1
  ) {
    next();
  } else {


    if (process.env.ENV !== 'production')
      console.log(`       >> ${status}: ${urlObject.pathname}/${search}`);

    res.redirect(status, `${urlObject.pathname}/${search}`);
  }

};

//────────────────────────────────────────────────────────────────────────────────





//
// ─── MIDDLEWARE LOG URL TO CONSOLE ──────────────────────────────────────────────
//


const logURL = (req, res, next) => {
  if (process.env.ENV !== 'production')
    console.log('URL Requested:', req.url);
  next();
}


//────────────────────────────────────────────────────────────────────────────────




//
// ─── MIDDLEWARE PRODUCTION NAKED TO WWW ──────────────────────────────────────────────
//


const toWWW = (req, res, next) => {

  if (process.env.ENV === 'production' && req.get('host') === 'ibcol.org') {
    return require('express-naked-redirect')({
      subDomain: 'www',
      https: true
    })(req, res, next);
  } else {
    next();
  }
}


//────────────────────────────────────────────────────────────────────────────────


app.prepare().then(() => {



  server
    // .use(toWWW)
    .use(logURL)
    .use(addSlash)
    .use(router)
    .use(handler)
    .listen(port);
})
