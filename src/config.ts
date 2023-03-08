// Este archivo carga las variables de entorno del proyecto, aquellas que esten en .env
import { config } from "dotenv";
config();

export default {
  mongodbURL: process.env.DB_CONNECTION_STRING,
  PORT: process.env.PORT || 3000,
};
