import mongoose, { Schema } from 'mongoose';

const UrlSchema = new Schema({
  longUrl: { type: String, unique: true, required: true }
});

export default mongoose.model('Url', UrlSchema);
