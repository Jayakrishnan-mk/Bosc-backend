const UserDB = require('../Models/userModel');
const bcrypt = require('bcrypt');
const { findByIdAndDelete } = require('../Models/userModel');

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


const userLogin = async (email, password) => {
    try {
        const user = await UserDB.findOne({ email }).select('-password');
        const data = await UserDB.findOne({ email });
        if (user) {
            // console.log('user' , user);
            // console.log('data.password' , data.password);

            const isMatch = await bcrypt.compare(password, data.password);
            if (isMatch) {
                // console.log('ismataach', isMatch);
                return user;
            } else {
                // console.log('deeeeeeeeeebug');
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
    }
}


const userByIdService = async (id) => {
    try {
        const user = await UserDB.findByIdAndUpdate(id).select('-password');
        return user;
    } catch (error) {
        console.log(error)
    }
}


const updateUser = async (id, firstName, lastName, email, password) => {
    try {
        // console.log('gitdyd');
        const salt = await bcrypt.genSalt(10);
        // console.log('salt',salt);
        // console.log("password",password);
        const hashPassword = await bcrypt.hash(password, salt);
        // console.log("hashPassword",hashPassword);
        const user = await UserDB.findByIdAndUpdate(id, {
            firstName, lastName, email, password: hashPassword
        }).select('-password');
        // console.log('eeeeeee', user);
        return user;
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id) => {
    await UserDB.findByIdAndDelete(id)

}


const profilePicChanger = async (id, image) => {
    try {
        
        const user = await UserDB.findByIdAndUpdate(id, {
            pic:image
        }).select('-password');
        return user;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {userCreate, isUserExist, userLogin, userByIdService, updateUser, deleteUser, profilePicChanger};