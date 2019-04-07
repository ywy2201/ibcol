function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}


const webpack = require('webpack')


if (process.env.NODE_ENV !== 'production') {
  require('now-env')
}


const withOffline = moduleExists('next-offline')
  ? require('next-offline')
  : {};

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

// console.log(">>>>>>> next.config.js process.env.ENV -->>>", process.env.ENV)

const nextConfig = {
  target: 'serverless',
  env: {
    ENV: process.env.ENV
  },
  webpack: (config) => {
    
    

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
}


console.log("=========================");
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log("=========================");


module.exports = (process.env.NODE_ENV === 'production') 
? moduleExists('next-offline')
? withOffline(withCSS(Object.assign({}, nextConfig, {
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  }
})))
: withCSS(nextConfig)
: withCSS(nextConfig);



