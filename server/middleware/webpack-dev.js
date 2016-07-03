import WebpackDevMiddleware from 'webpack-dev-middleware'
import applyExpressMiddleware from '../lib/apply-express-middleware'
import _debug from 'debug'
import config from '../../config'

const paths = config.utils_paths
const debug = _debug('app:server:webpack-dev')

export default function (compiler, publicPath) {
  debug('Enable webpack dev middleware.')

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
<<<<<<< HEAD
    contentBase: paths.client(),
=======
    contentBase: paths.base(config.dir_client),
>>>>>>> origin/master
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  })

  return async function koaWebpackDevMiddleware (ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
<<<<<<< HEAD
      end: (content) => (ctx.body = content),
=======
      end: (content) => ctx.body = content,
>>>>>>> origin/master
      setHeader: function () {
        ctx.set.apply(ctx, arguments)
      }
    })

    if (hasNext) {
      await next()
    }
  }
}
