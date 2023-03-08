import Task from "../models/Task";

// Listar tareas
const findAllTasks = async (req: any, res: any) => {
  try {
    const result = await Task.find();
    if (!result) {
      return res.status(200).json({message: "No existen registros"})
    }
    res.status(200).json(result); 
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Listar tareas por query params
const findTasks = async (req: any, res: any) => {
  try {
    if (Object.entries(req.query).length===0) {
      return findAllTasks(req, res)
    }
    const {title} = req.query;
    const condition = title ? {$regex: new RegExp(title), $options: "i"} : {};
    if (Object.values(title).length==0) {
      return res.status(200).json({message: "No ha ingresado parametros de busqueda"})
    }
    const result = await Task.find({title: condition});
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

// Agregar tarea
const addTask = async (req: any, res: any) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      done: req.body.done ? req.body.done : false, // Si envia dato done entonces lo usa y sino lo deja false
    });
    const result = await newTask.save();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Filtrar tarea por ID
const findTask = async (req: any, res: any) => {
  try {
    const result = await Task.findById(req.params.id);
    if (!result) {
      return res.status(404).json({message: `Task ${req.params.id} does not exist`})
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Filtrar tareas en estado done
const findAllDoneTasks = async (req: any, res: any) => {
  try {
    const result = await Task.find({ done: true });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Eliminar tarea
const deleteTask = async (req: any, res: any) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({message: `Task ${req.params.id} does not exist`})
    }
    res.status(200).send(`Tarea "${result.title}" Eliminada`);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// Actualizar tarea
const updateTask = async (req: any, res: any) => {
  try {
    const result = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (!result) {
      return res.status(404).json({message: `Task ${req.params.id} does not exist`})
    }
    res.status(200).send(`Tarea "${result.title}" actualizada`);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

export default {
  findAllTasks,
  addTask,
  findTask,
  findAllDoneTasks,
  deleteTask,
  updateTask,
  findTasks
};
