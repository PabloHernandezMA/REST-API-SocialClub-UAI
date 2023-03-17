import Cuota from "../models/Cuota";
import Socio from "../models/Socio";

// Listar tareas
const findAllCuotas = async (req: any, res: any) => {
  try {
    const result = await Cuota.find().populate("socio");
    if (result.length == 0) {
      return res.status(404).json({ message: "No existen registros" })
    }
    res.status(200).json(result);
    console.log(result)
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Agregar cuota
const addCuota = async (req: any, res: any) => {
  try {
    const validate = await Socio.findById(req.body.socioID);
    if (!validate) {
      return res.status(404).json({ message: `Socio ${req.body.socioID} does not exist` })
    }
    const newCuota = new Cuota({
      monto: req.body.monto,
      fechaPago: req.body.fechaPago ? req.body.fechaPago : new Date('01-01-2000'), // Si envia dato entonces lo usa y sino default
      fechaVencimiento: req.body.fechaVencimiento ? req.body.fechaVencimiento : new Date('YYYY/MM/DD'),
      estado: req.body.estado ? req.body.estado : false,
      socio: req.body.socioID,
    });
    const result = await newCuota.save();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Filtrar cuota por ID
const findCuotaByID = async (req: any, res: any) => {
  try {
    const result = await Cuota.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: `Cuota ${req.params.id} does not exist` })
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Filtrar cuotas en estado = true
const findAllCuotasPagas = async (req: any, res: any) => {
  try {
    const result = await Cuota.find({ estado: true }).populate("socio");
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Eliminar cuota
const deleteCuota = async (req: any, res: any) => {
  try {
    const result = await Cuota.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: `Cuota ${req.params.id} does not exist` })
    }
    res.status(200).send(`Cuota "${result._id}" Eliminada`);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Actualizar cuota
const updateCuota = async (req: any, res: any) => {
  try {
    const result = await Cuota.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({ message: `Cuota ${req.params.id} does not exist` })
    }
    res.status(200).send(`Cuota "${result._id}" actualizada`);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Actualizar estado cuota
const updateEstadoCuota = async (req: any, res: any) => {
  try {
    const fechaActual = new Date()
    const multa = 10;
    const multar = await Cuota.findById(req.params.id)
    if (!multar) {
      return res.status(404).json({ message: `Cuota ${req.params.id} does not exist` })
    }
    console.log(multar.fechaVencimiento.valueOf());
    console.log(multar.monto);

    if (multar.fechaVencimiento.valueOf() < fechaActual.valueOf()) {
      let sum = multar.monto
      sum += sum * 0.1;
      const result = await Cuota.findByIdAndUpdate(req.params.id, { monto: sum });
      if (!result) {
        return res.status(404).json({ message: `Cuota ${req.params.id} does not exist` })
      }
      res.status(200).send(`Monto cuota actualizado "${result._id}"`);
    }
    const result = await Cuota.findByIdAndUpdate(req.params.id, req.body.estado);
    if (!result) {
      return res.status(404).json({ message: `Cuota ${req.params.id} does not exist` })
    }
    if (req.body.estado) {
      res.status(200).send(`Cuota "${result._id}" marcada como Paga`);
    } else {
      res.status(200).send(`Cuota "${result._id}" marcada como Adeudada`);
    }

  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

/* Listar cuotas por query params ()

const findCuotaQuery = async (req: any, res: any) => {
  try {
    if (Object.entries(req.query).length === 0) {
      return findAllCuotas(req, res)
    }
    const { nombre, apellido, estado} = req.query;
    const queryNombre = nombre ? { $regex: new RegExp(nombre), $options: "i" } : {};
    const queryApellido = apellido ? { $regex: new RegExp(apellido), $options: "i" } : {};
    const queryEstado = estado ? { $regex: new RegExp(estado), $options: "i" } : {};

    if (nombre != "" && apellido != "" && estado != "") {
      const cuotas = await Cuota.find({ estado: queryEstado });

      //let filtro = cuotas.filter(cuota => cuota.id == socio)

      result = {}

      const socios = await Socio.find({ nombre: queryNombre, apellido: queryApellido });
      const cantidadResultados = socios.length;
      if (cantidadResultados === 0) {
        return res.status(200).json({ message: "No hay resultados de socios para su busqueda" })
      }

      res.status(200).json(`Se encontraron ${cantidadResultados} resultados para su busqueda: ${result}`);
    }
    res.status(404).json('No ha ingresado parametros');
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};
*/

export default {
  findAllCuotas,
  findAllCuotasPagas,
  findCuotaByID,
  //findCuotaQuery,
  addCuota,
  deleteCuota,
  updateCuota,
  updateEstadoCuota
};
