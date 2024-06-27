import { randomUUID } from 'node:crypto'
import { db } from './sql.js'

export class DatabaseSql {
    async list() {
        const clientes = await db.query`select * from clientes`
        return clientes.recordset
    }

    async create(cliente) {
        const clienteId = randomUUID()

        const { nome, aniversario, cpf, cafepreferido} = cliente

        await db.query`insert into clientes values (
            ${clienteId}, ${nome}, ${aniversario}, ${cpf}, ${cafepreferido}
        )`
    }

    async update(id, cliente) {
        const { nome, aniversario, cpf, cafepreferido} = cliente

        await db.query`update clientes
            set nome = '${nome}', aniversario = '${aniversario}', cpf = '${cpf}', cafe_preferido = '${cafepreferido}'
            where id = '${id}'`
    }

    async delete(id) {
        await db.query`delete from clientes where id = ${id}`
    }
}