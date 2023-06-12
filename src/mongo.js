
const {MongoClient} = require('mongodb')

let client = null

async function query(database, collection, cmd, args) {
    console.log('query', database, collection, cmd, args)
    if (!args) args = [{}]
    if (!Array.isArray(args)) args = [args]
    if (client == null) {
        client = new MongoClient(process.env.MONGO_URL)
        console.log('connecting to mongo', process.env.MONGO_URL)
        await client.connect()
    }
    const db = client.db(database)
    const col = db.collection(collection)
    if (cmd == 'find') {
        return await col[cmd](...args).toArray()
    }
    return await col[cmd](...args)
}



module.exports = function (fastify, options, done) {
    fastify.post('/:database/:collection/:cmd', async (request, reply) => {
        const {database, collection, cmd} = request.params
        const result = await query(database, collection, cmd, JSON.parse(request.body))
        return result
    })
    fastify.get('/status', async (request, reply) => {
        return "ok"
    })
    done()
}