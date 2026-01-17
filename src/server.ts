import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
//conectar a base de datos
export async function connectdb() {
    try{
        await db.authenticate();
        db.sync();
        //console.log(colors.blue('conexion exitosa a la BD'))
    }catch(e){
        console.log(colors.bgRed.white('hubo un error al conectar a la BD'))
    }
}
connectdb()
dotenv.config()
//instancia de express
const server = express();
//permitir conexiones
const corsOptions:CorsOptions = {
    origin: (origin,callback)=>{
        if(origin === process.env.FRONTEND_URL){
           callback(null,true)
        }else{
            callback(new Error('Error de Cors'),false)
        }
    }
}
server.use(cors(corsOptions))
//Leer datos del formulario
server.use(express.json())
server.use(morgan('dev'))
//Routing
server.use('/api/products',router)
//Docs
server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions))
export default server