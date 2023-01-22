const CheckHandler = require('./handler')
const routes = require('./routes')

module.exports = {
    name: 'check',
    version: '1.0.0',
    register: async (server, { service }) => {
        const checkHandler = new CheckHandler(service)
        server.route(routes(checkHandler))
    }
}