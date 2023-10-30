const bcrypt = require('bcrypt');
const user = require('../models/User');
const Bookings = require('../models/Booking');


const getAllUser = async (req, res, next) => {
    let users;
    try{
        users = user.Users.find();
    }
    catch(err) {
        return console.log(err);
    }
    
    if(!users) {
        return res.status(500).json ({ message:"Unexpected error occured" })
    }
    
    return res.status(200).json({ users })
};
const signUp = async (req, res,next) => {
    const {name, email, password} = req.body;
    if(
        !name && name.trim()==="" &&
        !email && email.trim()==="" && 
        !password && password.trim()===""
    )
    {
        return res.status(400).json ({ message: "Invalid Inputs" });
    };
    const hashedPassword = bcrypt.hashSync(password);
    let users;
    try{
      user = new user ({name, email, password: hashedPassword})
      await user.save();
    }
    catch(err){
        return res.json({err});
    }

if (!user) {
    return res.status(500).json({ message: "unexpected Error Occured"});
}
    return res.status(201).json ({ id:user._id })
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if(
        !name && name.trim()==="" &&
        !email && email.trim()==="" && 
        !password && password.trim()===""
    ){
        return res.status(422).json ({message: "Invalid Inputs"});
    }

    // const hashedPassword = bcrypt.hashSync(password);
    let users;
    try {
        user = await user.findByIdAndUpdate(id, {name, email, password});
    }
    catch(err) {
        return res.send(err.message);
    }
    if (!users) {
        return res.status(500).json({ message: "Something went wrong"})
    }
    res.status(200).json ({message: "Updated Successfully", user: users})
}
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let users;
    try{
        users = await user.findByIdAndDelete(id)
    }
    catch(err) {
        return res.send(err.message);
    }
    if(!users) {
        return res.status(500).json ({ message: "Something went wrong"})
    }
    res.status(200).json ({ message: "Deleted Successfully", user: users})
}
const logIn = async (req, res, next) => {
    const { email, password} = req.body;
    if(
        !email && email.trim()==="" && 
        !password && password.trim()===""
    )
    {
        return res.status(400).json({ message: "Invalid Inputs"})
    }
    let existingUser;
    try{
        existingUser = await user.findOne({ email });
    }
    catch(err){
        return res.send(err.message)
    }
    if(!existingUser){
        return res.status(400).json({ message: "User not found"})
    }

const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password"})
    }
    return res.status(200).json({ message: "Login Successfully", id:existingUser._id})
}

const getBookingofUser = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
        bookings = await Bookings.find({user:id}).populate("user movie");
    } catch (err) {
        return console.log(err)
    }
    if (!bookings) {
        return res.status(500).json({message: "Uexpected Error Occured."})
    }
    return res.status(201).json({bookings});
}

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let users;
    try {
        users = await user.findById(id);
    } catch (e) {
        return console.log(e);
    }
    if (!users) {
        return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(200).json({users})
}

module.exports = {getAllUser, signUp, updateUser, deleteUser, logIn, getBookingofUser, getUserById}