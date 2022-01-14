import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();
    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }
  public get(key: string): string {
    return this.envConfig[key];
  }
  public async getMongoConfig() {
    return {
      uri:
        'mongodb://' +
        this.get('MONGO_USER') +
        ':' +
        this.get('MONGO_PASSWORD') +
        '@' +
        this.get('MONGO_HOST') +
        '/' +
        this.get('MONGO_DATABASE') +
        '/'+
        this.get('MONGO_PORT') +
        '?retrywrites=true&w=majority',
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
  }
}
