

const createPost = async (req, res) => {

    const { userId, content, tags, image, location, visibility } = req.body;

    console.log(userId, content, tags, location, visibility);
    

}




module.exports = {
    createPost
}