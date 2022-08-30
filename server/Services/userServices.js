const UserDB = require('../Models/userModel');
const bcrypt = require('bcrypt');

const userCreate = async (data, pic) => {
    try {
        // console.log('dsa', pic);
        const { userName, firstName, lastName, email, password } = data;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await UserDB.create({
            userName,
            firstName,
            lastName,
            email,
            pic,
            password: hashPassword
        })
        return user;
    } catch (error) {
        console.log(error);
    }

}

const isUserExist = async (email, userName) => {
    try {
        const user = await UserDB.findOne({ $or: [{ email }, { userName }] })
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {userCreate, isUserExist};