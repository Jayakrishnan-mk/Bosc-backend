const AlbumDB = require('../Models/albumModel');

const albumCreate = async (description, coverPic, createdBy) => {
    try {
        const album = await AlbumDB.create({
            coverPic, description, createdBy
        })
        return album;

    } catch (error) {
        console.log(error);
        return { error }
    }
}


module.exports = { albumCreate } 