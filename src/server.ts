import express from "express"
import dotenv from 'dotenv'
import dataBase from "./database/ormconfig"

//Importando as rotas do site
import routes from "./routes"

dotenv.config()
const app = express()
//Config ou port 3000 ou 3001
const port = process.env.PORT || 3001 

app.use(express.json()) // Habilita o site a receber arq Json
app.use(routes)  // habitas as rotas

app.listen(port, () => {
    console.log(`Servidor executando porta ${port}`)
    console.log(`Banco de dados `,dataBase.isInitialized ? 'inicializado'  : 'não inicializado')
})