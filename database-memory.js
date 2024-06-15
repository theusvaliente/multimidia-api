import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #gocoffee = new Map()

    list() {
        return Array.from(this.#gocoffee.entries())
            .map((coffeeArray) => {
                const id = coffeeArray[0]
                const data = coffeeArray[1]

                return {
                    id,
                    ...data
                }
            })
    }

    create(coffee) {
        const userId = randomUUID()

        this.#gocoffee.set(userId, coffee)
    }

    update(id, coffee) {
        this.#gocoffee.set(id, coffee)
    }

    delete(id) {
        this.#gocoffee.delete(id)
    }
}