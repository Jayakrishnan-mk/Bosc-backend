const { create , register} = require('../Controllers/userController');
const upload = require('../utils/cloudinary');
const router = require('express').Router();



router.post('/register', upload.single('image'), create)









module.exports = router;