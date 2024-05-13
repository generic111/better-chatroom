import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJWTToken from "../../utils/generateJWTToken.js";
import { matchedData, validationResult } from "express-validator";

export const signup = async (req, res) => {
    try {
        const error = validationResult(req);

        const {fullName, username, password, confirmPassword} = req.body;

        if (error.isEmpty()) {
            const {fullName, username, password, confirmPassword} = matchedData(req);
            // console.log("matched data", fullName, username, password, confirmPassword);
        }

        else {
            return res.status(400).json({error: "XSS attack detected"});
        }


        if (password !== confirmPassword) {
            console.log("passwords do not match");
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
            role: user.role,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        
        console.log("error signing in", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const muteUser = async (req, res) => {
    // console.log("here");
    try {
        const {username} = req.body;

        const user = await User.findOne({username: username});

        if (!user) {
            return res.status(400).json({error: "User not found"});
        }

        else {
            user.muted = true;
            await user.save();
            res.status(200).json({message: "User muted"});
        }
    } catch (error) {
        console.log("error muting user", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const unmuteUser = async (req, res) => {
    try {
        const {username} = req.body;

        const user = await User.findOne({username: username});

        if (!user) {
            return res.status(400).json({error: "User not found"});
        }

        else {
            user.muted = false;
            await user.save();
            res.status(200).json({message: "User unmuted"});
        }
    } catch (error) {
        console.log("error muting user", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};