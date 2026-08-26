const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true } // har comment ki apni createdAt/updatedAt milegi
);

const postSchema = new mongoose.Schema(
  {
    // author is userId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      trim: true,
      maxlength: 280,
      default: "",
    },

    // Sirf URL/path store hota hai - actual file multer se disk/cloud pe
    image: {
      type: String,
      default: null,
    },
    video: {
      type: String,
      default: null,
    },

    tags: {
      type: [String],
      default: [],
      set: (tags) => tags.map((tag) => tag.toLowerCase().trim()), // consistent storage ke liye
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    visibility: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],
  },
  { timestamps: true } // createdAt, updatedAt automatic
);


// Validation: post khali nahi honi chahiye - content, image, ya video mein se kam se kam ek ho
// Naye Mongoose (7+) mein pre hooks ko `next` nahi milta - error report karne ke liye seedha throw karo
postSchema.pre("validate", function () {
  if (!this.content?.trim() && !this.image && !this.video) {
    throw new Error("Post must have content, an image, or a video");
  }
});

// Ek post mein image AND video dono na ho (mutual exclusive, jaisa frontend mein bhi enforce kiya)
postSchema.pre("validate", function () {
  if (this.image && this.video) {
    throw new Error("A post can have either an image or a video, not both");
  }
});

// Common queries fast banane ke liye indexes
postSchema.index({ userId: 1, createdAt: -1 }); // "kisi user ke saare posts, latest pehle"
postSchema.index({ tags: 1 }); // tag-based search/filter
postSchema.index({ visibility: 1, createdAt: -1 }); // public feed queries

// Virtual fields - actual DB mein store nahi hote, response mein calculate ho jaate hain
postSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

postSchema.virtual("commentsCount").get(function () {
  return this.comments.length;
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

const postModel = mongoose.models.post || mongoose.model("post", postSchema);

module.exports = postModel;