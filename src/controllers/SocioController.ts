import Socio from "../models/Socio";

// Listar socios
const findAllSocios = async (req: any, res: any) => {
  try {
    const result = await Socio.find();
    if (result.length==0) {
      return res.status(200).json({message: "No existen registros"})
    }
    res.status(200).json(result); 
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Listar socios por query params (TipoDoc)
const findSocios = async (req: any, res: any) => {
  try {
    if (Object.entries(req.query).length===0) {
      return findAllSocios(req, res)
    }
    const {tipoDoc} = req.query;
    const condition = tipoDoc ? {$regex: new RegExp(tipoDoc), $options: "i"} : {};
    if (Object.values(tipoDoc).length==0) {
      return res.status(200).json({message: "No ha ingresado parametros de busqueda"})
    }
    const result = await Socio.find({tipoDoc: condition});
    const cantidadResultados = result.length;
    if (cantidadResultados===0) {
      return res.status(200).json({message: "No hay resultados para su busqueda"})
    }
    res.status(200).json(result);
    console.log(result)
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Agregar socio
const addSocio = async (req: any, res: any) => {
  try {
    /*console.log(req.body.tipoDoc)
    const tipoDoc = req.body.tipoDoc.toUpperCase();
    console.log(tipoDoc)
    if (tipoDoc!="DNI"||tipoDoc!="CUIT") {
      return res.status(400).json({ message: "Tipo documento debe ser dni o cuit" });
    }
    const existe = await Socio.find({numeroDoc: req.body.numeroDoc})
    if (existe) {
      return res.status(400).json({message: `Ya existe un socio con documento ${req.body.numeroDoc}`})   
    }
    */const newSocio = new Socio({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      tipoDoc: req.body.tipoDoc.toUpperCase(),
      numeroDoc: req.body.numeroDoc,
      telefono: req.body.telefono
    });
    const result = await newSocio.save();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Filtrar socio por ID
const findSocioByID = async (req: any, res: any) => {
  try {
    const result = await Socio.findById(req.params.id);
    if (!result) {
      return res.status(404).json({message: `Socio ${req.params.id} does not exist`})
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Eliminar socio
const deleteSocio = async (req: any, res: any) => {
  try {
    const result = await Socio.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({message: `Socio ${req.params.id} does not exist`})
    }
    res.status(200).send(`Socio "${result.id}" eliminado`);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Actualizar socio
const updateSocio = async (req: any, res: any) => {
  try {
    /*const existe = await Socio.find({numeroDoc: req.body.numeroDoc})
    if (existe) {
      return res.status(400).json({message: `Ya existe un socio con documento ${req.body.numeroDoc}`})   
    }*/
    const result = await Socio.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({message: `Socio ${req.params.id} does not exist`})
    }
    res.status(200).send(`Socio "${result.id}" actualizado: ${result}`);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

export default {
  findAllSocios,
  addSocio,
  findSocioByID,
  deleteSocio,
  updateSocio,
  findSocios
};
