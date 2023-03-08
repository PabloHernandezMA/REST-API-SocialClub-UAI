import express from "express";
import cors from "cors";
const app = express();
import morgan from "morgan";
import configDataBase from "./config";
import database from "./database";
import taskRoutes from "./routes/task.routes";

//Settings
app.set("port", configDataBase.PORT); //Se configura el puerto. Si hay una variable de entorno definida como PORT toma de alli el valor. sino toma 3000
app.set("mongodbURL", configDataBase.mongodbURL);

//Middlewares
app.use(cors()); // Resuelve el CORS
app.use(express.json()); //Permite procesar paquetes json
app.use(morgan("dev"));

//Routes
app.use("/api/task", taskRoutes);
app.all("*", (req, res) => {
  res.status(404).send("<h1>404! Page not found</h1>");
});

//Conexion a DB
database
  .connectToDb()
  .then(() => console.log("Conectado con exito a database"))
  // si hubo algun error al conectar a la bd, se loguea el mensaje en la consola.
  .catch((err: any) => console.log(err));
//Enciende servidor
app.listen(app.get("port"), () => {
  console.log(
    "Escuchando en puerto:",
    app.get("port"),
    "URl:",
    app.get("mongodbURL")
  );
});

export default app;
