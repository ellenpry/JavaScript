import express, { request } from 'express'  // chamando a biblioteca express

const app = express() // passando o express pro app como uma funcao

// para essa requisicao eu deu uma resposta
app.get('/users', (request, response) => {
    app.send("It's ok")
})

app.listen(3000)
/*
1. Tipo de Rota / Método HTTP
2. Endereço
*/