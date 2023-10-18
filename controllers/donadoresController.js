import Donadores from "../models/Donadores.js";

const ObtenerDonadores = async (req, res) => {
    const donadores = await Donadores.find();
    res.json(donadores);
};

const CrearDonador = async (req, res) => {
    const { nombre, apellido, telefono, cantidad, fecha, comentario } =  req.body;
   
    try {
        const donador = new Donadores({
            nombre,
            apellido,
            telefono,
            cantidad,
            fecha,
            comentario
        });
        const donadorNuevo = await donador.save();
        res.status(201).json(donadorNuevo);
        } catch (error) {
        res.status(500).send("Hubo un error");
    }
};

const ObtenerDonador = async (req, res) => {
    const id = (req.params.id);
    try {
        const donador = await Donadores.findById(id);
        res.json(donador);
    } catch (error) {
        res.status(500).send("Hubo un error");
    }
};

const ActualizarDonador = async (req, res) => {
    const id = (req.params.id);
    const donador = await Donadores.findById(id);

    if(!donador){
        res.status(404).json({msg: "El donador no existe"});
    }

    donador.nombre = req.body.nombre || donador.nombre;
    donador.apellido = req.body.apellido || donador.apellido;
    donador.telefono = req.body.telefono || donador.telefono;
    donador.cantidad = req.body.cantidad || donador.cantidad;
    donador.fecha = req.body.fecha || donador.fecha;
    donador.comentario = req.body.comentario || donador.comentario;

    try {
        const donadorActualizado = await donador.save();
        res.status(201).json(donadorActualizado);
    } catch (error) {
        res.status(500).send("Hubo un error");
    }
};

const EliminarDonador = async (req, res) => {
    const id = (req.params.id);
    const donador = await Donadores.findById(id);

    if(!donador){
        res.status(404).json({msg: "El donador no existe"});
    }

    try {
        await Donadores.findByIdAndRemove({_id: id});
        res.json({msg: "Donador eliminado"});
    } catch (error) {
        res.status(500).send("Hubo un error");
    }
};


export {
    ObtenerDonadores,
    CrearDonador,
    ObtenerDonador,
    ActualizarDonador,
    EliminarDonador
}