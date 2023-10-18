import mongoose from "mongoose";

const DonadorSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    telefono:{
        type: String,
        required: true,
        trim: true
    },
    cantidad:{
        type: Number,
        required: true,
        trim: true
    },
    fecha:{
        type: Date,
        required: true,
        default: Date.now()
    },
    comentario:{
        type: String,
        trim: true
    }
},{
    timestamps: true,
});

const Donadores =  mongoose.model("Donadores", DonadorSchema);
export default Donadores;
