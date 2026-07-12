import { MongoClient, Db } from 'mongodb';
import { EventEmitter } from 'events';


export class MongoDatabase {
  private static instance: MongoDatabase | null = null;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private MONGO_URI = process.env.MONGO_URI 
  private DB_NAME = process.env.DB_NAME 
  private dbEvents = new EventEmitter();


  private constructor() {}

  public static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
  }

  public async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    try {
      this.client = new MongoClient(this.MONGO_URI);
      await this.client.connect();
      this.db = this.client.db(this.DB_NAME);
      console.log('Successfully connected to MongoDB.');

      const db = this.client.db("coffee-shop");
      const collection = db.collection("people-queue");

      const pipeline = [
        { $match: { operationType: { $in: ["insert", "update", "delete"] } } }
      ];
  
      const options = { fullDocument: "updateLookup" };
  
      const changeStream = collection.watch(pipeline, options);
      
  
      changeStream.on("change", (change) => {
        console.log(`Database change detected: ${change.operationType}`);
        this.dbEvents.emit("databaseUpdate", change);
      });
  
      changeStream.on("error", (error) => {
        console.error("Change stream error:", error);
      });
      return this.db;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  public async getMongoClient(): Promise<MongoClient>  {
    if (!this.client) {
      this.client = new MongoClient(this.MONGO_URI);
      await this.client.connect();
      console.log('Successfully connected to MongoDB');
    }
    return this.client;
  
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    return this.db;
  }
  
  public getEvents(): EventEmitter {
    if (!this.db) {
      throw new Error('EventEmmiter not setup');
    }
    return this.dbEvents;
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      MongoDatabase.instance = null;
      console.log('MongoDB connection closed.');
    }
  }
}
