

const createPost = async (req, res) => {

    const { userId, content, tags, location, visibility } = req.body;
    const path = req.file.path;

    
    console.log(userId, content, tags, location, visibility, image);
    

}




module.exports = {
    createPost
}