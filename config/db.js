import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        // Para que no salgan warnings en la consola
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
    
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Para que el servidor se caiga
        process.exit(1);
    }
}

export default conectarDB;