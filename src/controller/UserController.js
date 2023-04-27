const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const signup = async (req, res) => {
    const {name, username, email, password} = req.body;
    try{
        const existingUser = await userModel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({message: "user Already exist"});
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            name: name,
            username: username,
            email: email,
            password: hashPassword
        });

        const token = jwt.sign({email: result.email, id: result._id}, "SECRET_KEY");
        res.status(201).json({createdUser: result, token: token})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
}
const signin = async(req, res) => {
    const {email, password} = req.body;
    try{
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser){
           return res.status(400).json({message: "User not found"});
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credential"});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "SECRET_KEY");
        res.status(201).json({token: token, createdUser: {username: existingUser.username,  name: existingUser.name, email: existingUser.email, password: existingUser.password}})
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {signin, signup}