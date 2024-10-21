import Express from "express";

const app = Express()
app.use(Express.json())

app.post('/registro', (req, res) => {
    const {nome, sobrenome, email, senha, dataNascimento} = req.body

    if(!nome || !sobrenome || !email || !senha || !dataNascimento){
        res.send('você deve preecher todos os campos')
        return
    }
    console.log(email)
    res.send('usuário criado')
})

app.post('/login', (req, res) => {
    const {email, senha} = req.body

    if(!email || !senha ){
        res.send('você deve preecher todos os campos')
        return
    }
    console.log(email)
    res.send('usuário criado')
})

app.listen(8000)
/*/app.get('/registro', (req, res) => {
    console.log('tá funfando')
    res.send('tá funfando tbm')
})/*/
/*/if(nome != '' || nome != null){
        res.send('o campo nome deve ser preenchido')
    } else if(sobrenome != '' || sobrenome != null){
        res.send('o campo sobrenome deve ser preenchido')
    }/*/