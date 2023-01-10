import AppServer from "./presentation/server";
import {ContainerModule} from "./inversify/container";
import {MongoUtil} from "./data/db.init";
//Starts the application
(async () => {
  await MongoUtil.connect();
  
  ContainerModule.bindAll();
  
  const app = new AppServer();
  app.start();
})();