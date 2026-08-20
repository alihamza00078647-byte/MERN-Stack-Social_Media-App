const mongoose = require('mongoose');



// models/Post.js
const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [{
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });


const postModel = mongoose.models.post || mongoose.model('post', postSchema);

export default postModel;