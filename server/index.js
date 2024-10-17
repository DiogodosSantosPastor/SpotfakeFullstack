import { createServer } from 'node:http'

const servidor = createServer((request, resposta) => {
    console.log('batata')
    resposta.write('ta funfando123')
    return resposta.end()
})

servidor.listen(8000)