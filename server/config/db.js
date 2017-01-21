import mongoose from 'mongoose';

export default (conf) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(conf);
  mongoose.connection
    .once('open', () => console.log('MONGODB connected'))
    .on('error', err => console.error(err));
};
