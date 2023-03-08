//Conexion a base de datos
import mongoose from "mongoose";
import configDB from "./config";

async function connectToDb() {
try {
    // chequea si la variable de entorno esta definida.
    if (configDB.mongodbURL) {
      // intenta conectar con la db.
      const db = await mongoose.connect(configDB.mongodbURL);
      console.log("Conectado a:", db.connection.name);
    } else {
      // en caso que la variable no se haya cargado correctamente, loguea un mensaje en la consola.
      console.log("Connection string is missing");
    }
} catch (error: any) {
  console.log(error)
}
}

export default { connectToDb };
