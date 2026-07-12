import { MongoDatabase } from "./createDatabaseInstance.ts";
import 'dotenv/config'; 

export async function bootstrap() {
  const dbManager = MongoDatabase.getInstance();
  await dbManager.connect();
  await dbManager.getMongoClient()
}



