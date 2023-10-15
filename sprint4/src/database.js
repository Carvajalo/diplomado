import { connect, set } from 'mongoose';

import config from './config.js';

set("strictQuery", false);

(async () => {
  try {
    const uri = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER}/${config.MONGO_DATABASE}?retryWrites=true&w=majority`;
    const db = await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Database is connected to:', db.connection.name);
  } catch (error) {
    console.log(error);
  }
})()
