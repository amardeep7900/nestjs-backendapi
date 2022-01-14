import{Document} from 'mongoose';
export interface users extends Document{
   username:string;
   password:string;
}