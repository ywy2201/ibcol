const React = require('react')
const PropTypes = require('prop-types')
const NextLink = require('next/link').default
const NextRouter = require('next/router').default

const addHash = (href, as, hash) => (
  hash === undefined ? { href, as } : { href: `${href}#${hash}`, as: `${as}#${hash}`, }
)

const HashAwareRouter = ['push', 'replace', 'prefetch'].reduce((result, key) => {
  // eslint-disable-next-line no-param-reassign
  result[key] = (href, as = href, rest = {}) => {
    const updatedPaths = addHash(href, as, rest.hash)
    return NextRouter[key](updatedPaths.href, updatedPaths.as, rest)
  }
  // eslint-disable-next-line no-param-reassign
  result.nextRouter = NextRouter
  return result
}, {})

const HashAwareLink = (props) => {
  const newProps = Object.assign({}, props, addHash(props.href, props.as, props.hash))
  delete newProps.hash
  return React.createElement(NextLink, newProps)
}

HashAwareLink.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  hash: PropTypes.string,
}

const routes = require('next-routes')({
  Link: HashAwareLink,
  Router: HashAwareRouter,
})


// SAMPLES
// routes
//   .add('about')
//   .add('blog', '/blog/:slug')
//   .add('user', '/user/:id', 'profile')
//   .add('/:noname/:lang(en|es)/:wow+', 'complex')
//   .add({ name: 'beta', pattern: '/v3', page: 'v3' })

routes
  .add({ name: 'home', pattern: '/:locale/', page: 'home' })
  // .add({ name: 'about', pattern: '/:locale/about/', page: 'about' })
  .add({ name: 'how', pattern: '/:locale/how/', page: 'how' })
  // .add({ name: 'competition', pattern: '/:locale/competition/', page: 'competition' })
  .add({ name: 'ambassadors', pattern: '/:locale/ambassadors/', page: 'ambassadors' })
  .add({ name: 'sponsors', pattern: '/:locale/sponsors/', page: 'sponsors' })
  .add({ name: 'schedule', pattern: '/:locale/schedule/', page: 'schedule' })
  .add({ name: 'contact', pattern: '/:locale/contact/', page: 'contact' })
  .add({ name: 'registration', pattern: '/:locale/registration/', page: 'registration' })




  module.exports = routes