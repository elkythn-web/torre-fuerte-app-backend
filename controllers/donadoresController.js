import Donadores from "../models/Donadores.js";

const ObtenerDonadores = async (req, res) => {
    try {
      const donadores = await Donadores.find().select("-__v -createdAt -updatedAt ");
  
      // Formatear las fechas en cada documento
      const donadoresFormateados = donadores.map(donador => {
        // Formatear la fecha a "AAAA-MM-DD"
        const fechaFormateada = donador.fecha.toISOString().slice(0, 10);
  
        // Crear un nuevo objeto con la fecha formateada
        return { ...donador._doc, fecha: fechaFormateada };
      });
  
      res.json(donadoresFormateados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los donadores' });
    }
};

const ObtenerUltimosTresDonadores = async (req, res) => {
    try {
      const donadores = await Donadores.find().sort({ fecha: -1 }).limit(3).select("-__v -createdAt -updatedAt ");
  
      // Formatear las fechas en cada documento
      const donadoresFormateados = donadores.map(donador => {
        // Formatear la fecha a "AAAA-MM-DD"
        const fechaFormateada = donador.fecha.toISOString().slice(0, 10);
  
        // Crear un nuevo objeto con la fecha formateada
        return { ...donador._doc, fecha: fechaFormateada };
      });
  
      res.json(donadoresFormateados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los donadores' });
    }
}

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
    EliminarDonador,
    ObtenerUltimosTresDonadores
}