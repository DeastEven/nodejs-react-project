import express from 'express'
import dotenv from 'dotenv'
import {sequelize} from './db.js'
import models from "./models/models.js";
import cors from 'cors'
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api',router)

// обработка ошибок
app.use(errorHandler)
 const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`Server start on port ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}
start()

