<<<<<<< HEAD
import config from '../config'
import server from '../server/main'
import _debug from 'debug'

const debug = _debug('app:bin:server')
=======
require('babel-register')

const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')

>>>>>>> origin/master
const port = config.server_port
const host = config.server_host

server.listen(port)
<<<<<<< HEAD
debug(`Server is now running at http://${host}:${port}.`)
debug(`Server accessible via localhost:${port} if you are using the project defaults.`)
=======
debug(`Server is now running at ${host}:${port}.`)
>>>>>>> origin/master
