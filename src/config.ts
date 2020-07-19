import { join } from 'path';

const config = {
  mongodb: {
    // uri: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/carrot`,
    uri: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ngkgc.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
  },
  static: {
    path: join(__dirname, '..', 'static'),
  },
};

export default config;
