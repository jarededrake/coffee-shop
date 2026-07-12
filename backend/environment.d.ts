declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URI: string;
        DB_NAME: string;
      }
    }
  }
  
  // If this is a module, ensure it has at least one export statement
  export {};
  