import mongoose, {ConnectOptions} from 'mongoose';
import {Logger} from "../utils";
import CONFIG from "../config/CONFIG";

export class MongoUtil {
  static async connect() {
    const user = CONFIG.mongoDbUser;
    const password = CONFIG.mongoDbPassword;
    const host = CONFIG.mongoDbHost;
    const port = CONFIG.mongoDbPort;
    const dbName = CONFIG.mongoDbName;
    const authSrc = CONFIG.mongoAuthSrc;
    const connString = `mongodb://${host}:${port}/${dbName}`;
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: authSrc,
      user: user,
      pass: password,
    };
    
    mongoose.set('strictQuery', false);
    await mongoose.connect(connString, options as ConnectOptions);
    
    Logger.log('MongoDB connected to:', connString);
  }
}