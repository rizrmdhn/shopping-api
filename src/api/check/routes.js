const routes = (handler) => [
    {
        method: 'GET',
        path: '/',
        handler: handler.checkApi,
    }
]

module.exports = routes;