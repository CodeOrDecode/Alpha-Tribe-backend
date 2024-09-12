const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usermodel = require("../models/userModel");
const authmiddleware = require("../middlewares/authmiddleware")


const userRouter = Router();


userRouter.post("/auth/register", async (req, res) => {
    const { username, email, password, pic, bio } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ message: "error hashing password" })
            }
            else {
                let user = new Usermodel({
                    username,
                    email,
                    pic,
                    bio,
                    password: hash
                })
                await user.save();
                res.status(200).json({ success: true, message: "user registered successfully" })
            }

        });
    } catch (error) {
        res.status(400).json({ message: "error while registering" })
    }

})


userRouter.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await Usermodel.findOne({ email })

    try {
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ userid: user._id, username: user.username }, process.env.SECRET_KEY);
                    res.status(200).json({ message: "login successfully", token, user: { id: user._id, username: user.username, email } })
                }
                else {
                    res.status(400).json({ message: "Invalid password" })
                }

            });
        }
        else {
            res.status(400).json({ message: "User not found" })
        }

    } catch (error) {
        res.status(400).json({ message: "error while login" })
    }

})



userRouter.get("/user/profile/:userId", authmiddleware, async (req, res) => {

    let { userId } = req.params

    try {
        let user = await Usermodel.findOne({ _id: userId });
        res.status(200).json({ id: user._id, username: user.username, bio: user.bio, profilePicture: user.pic })
    } catch (error) {
        res.status(400).json({ message: "error getting user" })
    }

})



userRouter.put("/user/profile", authmiddleware, async (req, res) => {

    let userid = req.body.userid;

    try {
        await Usermodel.findByIdAndUpdate({ _id: userid }, req.body);
        res.status(200).json({ success: true, message: "Profile updated" })
    } catch (error) {
        res.status(400).json({ message: "error updating user" })
    }

})

module.exports = userRouter