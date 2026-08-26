const postModel = require("../models/postModel");
const userModel = require("../models/userModel");


const createPost = async (req, res) => {

    try {
        const { userId, content, tags, location, visibility } = req.body;
        const image = req.files.image ? req.files.image[0]?.path : null;
        const video = req.files.video ? req.files.video[0]?.path : null;

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
const getAllPosts = (req, res) => {

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




module.exports = {
    createPost, getAllPosts, userProfile
}