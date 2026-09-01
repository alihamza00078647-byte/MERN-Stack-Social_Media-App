const postModel = require("../models/postModel");
const userModel = require("../models/userModel");


const createPost = async (req, res) => {

    try {
        const { userId, content, tags, location, visibility } = req.body;
        console.log(req.files.image[0]?.filename);
        // image path 
        const image = req.files.image? 
        `${req.protocol}://${req.get("host")}/uploads/images/${req.files.image[0]?.filename}` : null;
        
        // video path
        const video = req.files.video? 
        `${req.protocol}://${req.get("host")}/uploads/videos/${req.files.video[0]?.filename}` : null;

        const post = new postModel({
            userId, 
            content, 
            tags: tags ? JSON.parse(tags) : [],
            location,
            visibility,
            image, 
            video
        });
    
        await post.save();

        res.json({success: true, message: "Post Uploaded", post});     
    } catch (error) {
        res.json({success: false, message: error.message});        
    }
}

// All Posts to get 
const getAllPosts = async (req, res) => {
    try {
        
        const posts = await postModel.find();

        if (!posts) {
            res.json({success: false, message: "No Posts Available"});
        }

        res.json({success: true, posts});
        
    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

// get profile posts
const userProfile = async (req, res) => {

    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);

        // Just in case
        if (!user) {
            return res.json({success: false, message: "Unauthorized"});
        }

        const posts = await postModel.find({userId});
        // if (posts.length === 0) {
        //     return res.json({message: "No Post Available yet!"});
        // }

        res.json({success: true, posts});     

    } catch (error) {
        res.json({success: false, message: error.message});        
    }
}


// Like Posts Logic to update likes
const likePost = async (req, res) => {
    try {

        const { postId } = req.body;
        const userId = req.userId;

        const post = await postModel.findById(postId);

        // find if post exists or not
        if (!post) {
            return res.json({success: false, message: "Post not found"});
        } 


        // ObjectId ko string banake compare karo - .includes() ObjectId pe kaam nahi karta
        // if (post.likes.includes(userId)) {
        //     // User has already liked the post, so unlike it
        //     post.likes = post.likes.filter((id) => id.toString() !== userId);
        // } else {
        //     post.likes.push(userId); // Ensure likes is an array
        // }
        

        // Check if the user has already liked the post
        const alreadyLiked = post.likes.some((id) => id.toString() === userId);
        console.log("Already liked:", alreadyLiked);

        if (alreadyLiked) {
            // User has already liked the post, so unlike it
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId); // Ensure likes is an array
        }

        await post.save({ new: true }); // Returns the latest changed document

        res.json({message: "Liked Post", likes: post.likes.length, success: true});
    } catch (error) {
        res.json({success: false, message: error.message});
    }

} 

// Post delete 
const deletePost = async (req, res) => {
    
    try {
        
        const { postId } = req.params;
        const post = await postModel.findById(postId);

        if (!post) {
            return res.json({success: false, message: "Post not found"});
        }

        await postModel.findByIdAndDelete(postId);

        res.json({success: true, message: "Post deleted successfully"});

    } catch(error) {
        res.json({success: false, message: error.message});
    }
}




module.exports = {
    createPost, getAllPosts, userProfile, likePost, deletePost,
}