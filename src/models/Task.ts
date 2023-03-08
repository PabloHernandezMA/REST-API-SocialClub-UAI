import { Schema, model } from 'mongoose';

interface ITask{
  title: string,
  description: string,
  done: boolean
}

const taskSchema = new Schema(
  {
    //Formatea datos de la DB con mongoose
    title: {
      type: String, //Tipo string
      require: true, //Campo obligatorio o requerido
      strim: true, //Elimina antes de guardar los espacios al principio y final del string
    },
    description: {
      type: String,
      strim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false, //Al crear el objeto mongoose no añadira la propiedad '__v'
    timestamps: true, //Agrega proiedades 'createdAt' y 'updatedAt'
  }
);
let Task = model<ITask>('Task', taskSchema); //Para poder usar el schema en el resto del proyecto se debe exportar como un model, por eso esto
export default Task
