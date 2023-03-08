import { Schema, model, SchemaTypeOptions } from 'mongoose';

export type TipoDocumento = 'DNI' | 'CUIT'

interface ISocio{
  nombre: string,
  apellido: string,
  tipoDoc: TipoDocumento,
  numeroDoc: number,
  telefono: number
}

const socioSchema = new Schema(
  {
    //Formatea datos de la DB con mongoose
    nombre: {
      type: String, //Tipo string
      require: true, //Campo obligatorio o requerido
      strim: true //Elimina antes de guardar los espacios al principio y final del string
    },
    apellido: {
      type: String,
      require: true,
      strim: true
    },
    tipoDoc: {
      type: String,
      require: true
    },
    numeroDoc: {
      type: Number,
      unique : true,
      require: true,
      validate: (value:Number) => value > 10000000
    },
    telefono: {
      type: Number,
      require: true
    }
  },
  {
    versionKey: false, //Al crear el objeto mongoose no añadira la propiedad '__v'
    //timestamps: true, //Agrega proiedades 'createdAt' y 'updatedAt'
  }
);
let Socio = model<ISocio>('Socio', socioSchema); //Para poder usar el schema en el resto del proyecto se debe exportar como un model, por eso esto

export default Socio