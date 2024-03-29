import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()  //Carrega as variaveis do arq .env

const dataBase = new DataSource({
    type:'sqlite',
    database: process.env.DATABASE || './src/database/database.sqlite',
    entities: [
        './src/models/*.ts'
    ],
    logging: true, //Log das queries exec
    synchronize: true //Cria as tabelas automaticas
})

dataBase.initialize()
.then(() => {
    console.log('Banco de dados inicializado');
})
.catch((err) => {
    console.log(`Erro ao inicializar banco de dados`,err);
})

export default dataBase