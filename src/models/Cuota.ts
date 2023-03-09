import { Schema, model, Types } from 'mongoose';

interface ICuota{
  monto: number,
  fechaPago: Date,
  fechaVencimiento: Date,
  estado: boolean,
  socio: string
}

const cuotaSchema = new Schema(
  {
    //Formatea datos de la DB con mongoose
    monto: {
      type: Number, //Tipo string
      require: true, //Campo obligatorio o requerido
      strim: true //Elimina antes de guardar los espacios al principio y final del string
    },
    fechaPago: {
      type: Date,
      require: true
    },
    fechaVencimiento: {
      type: Date,
      require: true
    },
    estado: {
      type: Boolean,
      require: true,
      default: false
    },
    socio: {
      type: String,
      require: true
    },
  },
  {
    versionKey: false, //Al crear el objeto mongoose no añadira la propiedad '__v'
    //timestamps: true, //Agrega proiedades 'createdAt' y 'updatedAt'
  }
);
let Cuota = model<ICuota>('Cuota', cuotaSchema); //Para poder usar el schema en el resto del proyecto se debe exportar como un model, por eso esto

export default Cuota