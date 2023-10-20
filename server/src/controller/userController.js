const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const emailUser = await userModel.findOne({
            where:{
                email: email
            }
        })

        if(!emailUser){
            if(email === "" || password === ""){
                return res.status(400).json({msg: "E-mail and password fields are required"});
            }else{
                const hashedPassword = await bcrypt.hash(password, 10)
                await userModel.create({name, email, password: hashedPassword}); 
                return res.status(201).json({msg: "User created with success"});
            }
        }else{
            return res.status(409).json({msg: "User already exists"});
        }
    }catch(err){
        return res.status(500).json({msg: "Ocurred this error " + err});
    }
}

const loginUser = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        if(email === "" || password === ""){
            res.status(400).json({msg: "E-mail and password fields are required"});
        }

        const user = await userModel.findOne({
            where: {
                email: email
            }
        })

        if(!user){
            return res.status(409).json({msg: "This user doesn't exists!"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)

        if(!isPasswordValid){
            return res.status(409).json({msg: "Not authorized"}); 
        }

        const token = jwt.sign({name: user.name, email: user.email, password: user.password},
            process.env.JWT_TOKEN, {
            expiresIn: '3h',
        })
        res.json({msg: "Welcome " + user.email, user: user, token: token});
       
    }catch(err){
        return res.status(500).json({msg: "Ocurred this error " + err});
    }
} 

module.exports = {registerUser, loginUser};



