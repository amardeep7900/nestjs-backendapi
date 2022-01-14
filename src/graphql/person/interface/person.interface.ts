import {Document} from 'mongoose';

export interface person extends Document{

 readonly  title:string;
  readonly age:number;
  readonly description:string;
 readonly name:string;
}