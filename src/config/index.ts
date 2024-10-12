export const config = {
  mongoDbUri: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
  authSecretKey: process.env.AUTH_SECRET_KEY,
  baseUrl: process.env.BASE_URL,
};
