import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

// Conexión a la DB
connectDB()

const app = express()

// Cors
app.use(cors(corsConfig))

// Habilitar: leer datos de un formulario
app.use(express.json())

// Routing
app.use('/', router)

export default app