import * as dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV === 'development',
  logActive: process.env.LOG_ACTIVE || true,
  httpPort: process.env.HTTP_PORT || "3000",
  httpsPort: process.env.HTTPS_PORT || "3001",
  mongoDbHost: process.env.MONGO_DB_HOST || 'localhost',
  mongoDbPort: process.env.MONGO_DB_PORT || 27017,
  mongoDbName: process.env.MONGO_DB_NAME || 'test',
  mongoDbUser: process.env.MONGO_DB_USER || 'test',
  mongoDbPassword: process.env.MONGO_DB_PASS || 'test',
  mongoAuthSrc: process.env.MONGO_DB_AUTH_SOURCE || 'admin',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  accessTokenExpiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN),
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
  refreshTokenExpiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  
};
export default CONFIG;