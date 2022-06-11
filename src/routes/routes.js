import authRoutes from "./auth-routes.js"
import usersRoutes from "./users-routes.js"

export const renderRoutes = [
    {
        method: 'GET',
        url: '/health',
        handler: (_, res) => res.status(200).send(console.log('No ar'))
    },
    ...Object.values(usersRoutes),
    ...Object.values(authRoutes)
]

export default (fastify, opts, next) => {
    fastify.decorateRequest('user', null)

    fastify.addHook('onRequest', (req, res, next) => {
        console.log('onRequest')
        req.user = null
        next()
    })
    for (let route of renderRoutes) { fastify.route(route) }
    next()
}