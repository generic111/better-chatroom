import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJWTToken from "../utils/generateJWTToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Password do not match"});
        }

        const user = await User.findOne({username});

        if (user) {
            return res.status(400).json({error: "User already exists"});
        }

        // Password hashing here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // profile pic

        const profilePic = `https://avatar.iran.liara.run/username?username=[${fullName}]`;

        const newUser = await User({
            fullName,
            username,
            password: hashedPassword,
            profilePic,
        });
        
        if (newUser) {

            generateJWTToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        
        else {
            return res.status(400).json({error: "User creation failure"});
        }


    } catch (error) {
        console.log("error signing up", error.message);
        res.status(500).json({error: "Internal server error"});
    };
};

export const signout = (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({message: "Signout success"});
    } catch (error) {
        console.log("error signing out", error.message);
        res.status(500).json({error: "Internal server error"});
    
    }
};

export const signin = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid credentials"});
        };

        generateJWTToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("error signing in", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};