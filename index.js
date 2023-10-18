import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import donadorRoutes from './routes/donadorRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

app.use(cors())

//Rutas
app.use('/api/donadores', donadorRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
})
