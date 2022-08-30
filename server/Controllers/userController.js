const { userCreate, isUserExist } = require("../Services/userServices");

const create = async (req, res) => {
    try {
        console.log('ww', req.body);
        const exist = await isUserExist(req.body.email, req.body.userName);
        console.log('qqqqqq', exist);
        if (!exist) {
            const pic = req.file ? req.file.path : "https://www.w3schools.com/howto/img_avatar.png";
            console.log('a',req.file);
            const user = await userCreate(req.body, pic);
            return res.status(200).json(user)
        }
        else {
            return res.status(401).json({ message: "User already exist!" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
} 


module.exports = { create };