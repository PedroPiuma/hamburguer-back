import server from './config/server.js'
import { envs } from './helpers/utils.js'

server.listen({ port: envs.PORT }, (err, address) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log(`🚀 Servidor construído: http://localhost:${envs.PORT}`)
})
