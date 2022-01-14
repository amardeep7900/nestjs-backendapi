import * as mongoose from 'mongoose';

export const personschema= new mongoose.Schema({
  title:String,
  description:String,
  name:String,
  age:Number,
  
})
