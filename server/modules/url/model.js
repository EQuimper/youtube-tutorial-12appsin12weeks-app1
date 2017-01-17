import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

const UrlShema = new Schema({
  longUrl: { type: String, unique: true, required: true },
  shortUrl: {
    type: String,
    unique: true,
    maxLength: [6, 'Error with the length']
  }
});

/**
* Function for make short version
*/
const makeUniqueUrl = len =>
  crypto
    .randomBytes(Math.ceil(len * (3 / 4)))
    .toString('base64')
    .slice(0, len)
    .replace(/\+/g, '0')
    .replace(/\//g, '0');

UrlShema.pre('save', function (next, done) { // eslint-disable-line
  this.shortUrl = makeUniqueUrl(6);

  mongoose.models.Url.findOne({ shortUrl: this.shortUrl })
    .then(
      url => {
        if (url) {
          this.shortUrl = makeUniqueUrl(6);
        }
      },
      error => done(error)
    );
  next();
});

export default mongoose.model('Url', UrlShema);
