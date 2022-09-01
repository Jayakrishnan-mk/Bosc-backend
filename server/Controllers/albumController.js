
const { albumCreate } = require('../Services/albumServices') 

const createAlbum = async (req,res) => {
    try {
        // console.log('eeeeeee', req.file);
        // console.log('bbbbbbbbbbbbbbbbbeeeeeee', req.body);
        const description = req.body?.description;
        const image = req.file?.path;
         const userId = req.user?._id;

        //  const files = req.body.photos
        //  console.log('wwwwwwwwww', Array.from(files[0]));

        // for (var pair of files.entries()) {
        //     console.log(pair[0]+ ' - ' + pair[1]); 
        // }

        const album = await albumCreate(description, image, userId);
        // console.log('resultttttttt', album);
        if (album.error) {
            // console.log('not      savinggggggggg............');
            return res.status(401).json({message: "Not saved successfully!"})
        }
        else {
            // console.log('savinggggggggg............');
            return res.status(200).json({message: "Saved"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Image coundn't uploaded!!"})
    }
}



module.exports = {createAlbum}