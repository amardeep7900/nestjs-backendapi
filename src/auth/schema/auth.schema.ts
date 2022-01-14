import * as mongoose from 'mongoose';
export const authschema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});
