/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { generateToken } = require("../utils/generateToken");

// login user
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {

        res.status(200).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            birthday: user.birthday,
            role: user.role,
            userToken: generateToken(user._id),
        });
    } else {
        res.status(401).send("Invalid Email or Password!");
    }
};

//register user
const register = async (req, res) => {
    const { firstname, lastname, email, birthday, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        res.status(400).send("The user already exists");
    }

    const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        email: email,
        password: password,
        role: "user"
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            birthday: user.birthday,
            role: user.role
        });
    } else {
        res.status(400).send("Invalid user data");
    }
};

// all users data get
const getUsers = async (req, res) => {
    const users = await User.find({role: "user" }, { password: 0, __v: 0 });
    res.status(200).send(users);
};

// delete user data
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.deleteOne({ _id: userId });

        res.send({ status: 'success' });

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// get one user data
const getOneUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById({ _id: userId });

        res.status(200).send(user);

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// update user data
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { firstname, lastname, email, birthday } = req.body;
    try {
        const userExist = await User.findById({ _id: userId });
        userExist.firstname = firstname;
        userExist.lastname = lastname;
        userExist.email = email;
        userExist.birthday = birthday;
        userExist.updateAt = Date.now();
        await userExist.save();

        res.status(200).send({ status: 'success' });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

//update Profile
// update user data
const updateProfile = async (req, res) => {
    const { _id } = req.user;
    const { firstname, lastname, email, birthday } = req.body;
    try {
        const profileExist = await User.findById({ _id: _id });
        profileExist.firstname = firstname;
        profileExist.lastname = lastname;
        profileExist.email = email;
        profileExist.birthday = birthday;
        profileExist.updateAt = Date.now();
        await profileExist.save();

        res.status(200).send({ status: 'success' });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

const getUserProfile = async (req, res) => {
    // req.user was set in authMiddleware.js
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            birthday: user.birthday,
            email: user.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

module.exports = {
    login,
    register,
    getUsers,
    deleteUser,
    getOneUser,
    updateUser,
    updateProfile,
    getUserProfile
}