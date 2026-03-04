import express from 'express';
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db';

const app = express()

// Conexión a la DB
connectDB()

// Habilitar: leer datos de un formulario
app.use(express.json())

// Routing
app.use('/', router)

export default app