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

}

// Post delete 
const deletePost = async (req, res) => {
    const { postId } = req.params;

    try {

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