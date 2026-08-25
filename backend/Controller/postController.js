

const createPost = async (req, res) => {

    const { userId, content, tags, location, visibility } = req.body;
    const f = req.files;


    console.log(userId, content, tags, location, visibility, f);
    

}




module.exports = {
    createPost
}