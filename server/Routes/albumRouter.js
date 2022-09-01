const router = require('express').Router();
const {createAlbum}  = require('../Controllers/albumController')
const {checkUser} = require('../Middlewares/authMiddleware')
const upload = require('../utils/cloudinary');


router.use(checkUser)

// router.post('/',  upload.any(), createAlbum )
router.post('/',  upload.single('image'), createAlbum ) 








module.exports = router;