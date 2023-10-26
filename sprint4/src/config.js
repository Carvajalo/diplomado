import dotenv from 'dotenv';
dotenv.config();


const baseUrl = () => {
  const { NODE_ENV } = process.env;
  const urls = {
    development: '3000',
    production: 'myapp.com',
    test: 'http://localhost:3000',
  };
  return urls[NODE_ENV] || urls.development;
}

const BASE_URL = baseUrl();

export const API_URL = `${BASE_URL}/api/v1`;

export default {
  PORT: process.env.PORT || 3000,
  MONGO_HOST: process.env.MONGO_HOST || '127.0.0.1',
  MONGO_USER: process.env.MONGO_USER || '<password>',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || '<password>',
  MONGO_DATABASE: process.env.MONGO_DATABASE || '<database>',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  TOKEN_EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME || '3w',
  MONGO_CLUSTER: process.env.MONGO_CLUSTER || '<clusterName>',
  API_URL,
};
