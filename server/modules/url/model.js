import mongoose, { Schema } from 'mongoose';

const UrlShema = new Schema({
  longUrl: { type: String, unique: true, required: true }
});

export default mongoose.model('Url', UrlShema);
