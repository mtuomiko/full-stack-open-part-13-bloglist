export { }; // what magic is this ?

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      JWT_SECRET: string;
    }
  }
}
