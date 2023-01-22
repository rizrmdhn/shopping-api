const routes = (handler) => [
    {
        method: 'GET',
        path: '/products',
        handler: handler.getProducts,
    },
]

module.exports = routes;