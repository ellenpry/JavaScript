import express, { request, response } from 'express'  // chamando a biblioteca express
import { PrismaClient } from './generated/prisma/index.js' // chamndo o prisma

const prisma = new PrismaClient()
const app = express() // passando o express pro app como uma funcao
app.use(express.json()) // avisando ao express para usar json

// criar um usuario
app.post('/users', async (request, response) => { // o async indica que é assincrona

    // utilizando o prisma pra conectar com o banco de dados
    await prisma.user.create({  // o await manda o banco esperar uma resposta
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(201).json(request.body) // caso der erro

})

// para essa requisicao eu deu uma resposta
app.get('/users', async (request, response) => {

    let usuarios = []
    if (request.query){
        usuarios = await prisma.user.findMany({
            where: {
                name: request.query.name,
                email: request.query.email,
                age: request.query.age
            }
        })

    } else {
        usuarios = await prisma.user.findMany()
    }

    response.status(200).json(usuarios)

})

app.put('/users/:id', async (request, response) => { // o async indica que é assincrona

    // utilizando o prisma pra conectar com o banco de dados
    await prisma.user.update({  // o await manda o banco esperar uma resposta
        where: {
            id: request.params.id
        },
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })

    response.status(201).json(request.body) // caso der erro

})

app.delete('/users/:id', async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })

    response.status(200).json({message: 'Usuário deletado com sucesso!'}) 
})

app.listen(3000) // pra rodar meu servidor ('node server.js' no terminal)

/*

1. Tipo de Rota / Método HTTP
2. Endereço

*/

/*

Criar nossa API de usuários
1. criar um usuário
2. listar todos os usuários
3. deletar um usuário

*/