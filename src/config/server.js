import Fastify from "fastify";
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import routes from '../routes/routes.js'

const fastify = Fastify({ logger: true })

fastify.register(cors, {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
})

fastify.register(helmet);
fastify.register(routes);

export default fastify
