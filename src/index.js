const fastify = require('fastify')({ logger: true })
fastify.register(require('./mongo'))

const start = async () => {
  try {
    console.log('Starting mongo rest api server')
    await fastify.listen({ host:'0.0.0.0', port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()