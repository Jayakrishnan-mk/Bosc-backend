
const { albumCreate } = require('../Services/albumServices')

const createAlbum = async (req, res) => {
    try {
        const description = req.body?.description;
        const image = req.file?.path;
        const userId = req.user?._id;

        const album = await albumCreate(description, image, userId);
        if (album.error) {
            return res.status(401).json({ message: "Not saved successfully!" })
        }
        else {
            return res.status(200).json({ message: "Saved" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Image coundn't uploaded!!" })
    }
}



module.exports = { createAlbum }