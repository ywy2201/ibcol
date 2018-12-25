const webpack = require('webpack')
require('now-env')

const withOffline = require('next-offline')



/**
 * If some of the envs are public, like a google maps key, but you still
 * want to keep them secret from the repo, the following code will allow you
 * to share some variables with the client, configured at compile time.
 */
// module.exports = {
//   webpack: config => {
//     config.plugins.push(
//       new webpack.DefinePlugin({
//         'process.env.ENV': JSON.stringify(process.env.ENV)
//       })
//       // Same as above
//       // new webpack.EnvironmentPlugin(['SECRET'])
//     )
//     return config
//   }
// }


// const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

// const withSourceMaps = require('@zeit/next-source-maps')

// module.exports = withCSS(
//   withSourceMaps(
//     withSass({
//       sassLoaderOptions: {
//         precision: 2
//       }
//     })
//   )
// );

// module.exports = withCSS(

//     withSass({
//       sassLoaderOptions: {
//         precision: 2
//       }
//     })
// );

// module.exports = withSass();
// module.exports = withCSS();

module.exports = withOffline(withCSS({
  webpack: (config) => {
    
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ENV': JSON.stringify(process.env.ENV)
      })
      // Same as above
      // new webpack.EnvironmentPlugin(['SECRET'])
    )

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return config
  }
}))