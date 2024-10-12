export const config = {
  mongoDbUri: process.env.MONGODB_URI,
  dbName: process.env.DB_NAME,
  authSecretKey: process.env.AUTH_SECRET_KEY,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
};
