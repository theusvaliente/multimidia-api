import { fastify } from "fastify";
import cors from '@fastify/cors'
import { DatabaseMemory } from "./database/database-memory.js";
import { DatabaseSql } from "./database/database-sql.js";

const server = fastify();

await server.register(cors,{
    origin: '*',
    methods: ['GET']
})

const database = new DatabaseSql()

server.get('/gocoffee', () => {
    return database.list()
})

server.post('/gocoffee', (req, res) => {
    const { nome, aniversario, cpf, cafepreferido } = req.body

    database.create({
        nome,
        aniversario,
        cpf,
        cafe_preferido
    })

    return res.status(201).send()
})

server.put('/gocoffee/:id', (req, res) => {
   const id = req.params.id
   const { nome, aniverssario, cpf, cafepreferido } = req.body

   database.update(id, {
        nome,
        aniverssario,
        cpf,
        cafe_preferido
   })

   res.status(204).send()
})

server.delete('/gocoffee/:id', (req, res) => {
    const id = req.params.id
    database.delete(id)
    return res.status(200).send()
})

server.listen({
    port: 3333
})