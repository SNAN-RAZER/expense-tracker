const { userModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signup = async (req,res)=>{
    const {
        email,
        username,
        password
    } = req.body;

    const existingUser  = await userModel.findOne({email});
    if(existingUser)
    {
       return res.status(400).send({message:"user already exists",success:false}); 
    }
    const hashedPassword = bcrypt.hashSync(password,10);
    const user  = new userModel({
        email,
        username,
        password:hashedPassword
    });

    await user.save();

    return res.status(201).send({message:"user created sucessfully",success:true})


};



const login= async (req,res)=>{
    const {
        email,
        password
    } = req.body;

    const user = await userModel.findOne({email});
    
    if(!user)
    {
        return res.status(404).send({message:"user not found",success:false});

    }
    const userToSend ={
        ...user._doc,password:""
    }
    const isPasswordCorrect = bcrypt.compareSync(password,user.password);
    if(!isPasswordCorrect)
    {
        return res.status(401).send({message:"Invalid credentials",success:false});
    }
    return res.status(200).send({message:"User logged in sucessfully",success:true,user:userToSend});

};


module.exports={
    signup,
    login
}