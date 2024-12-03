// const express=require('express');
// const authController=require('../controller/authController');

// const router=express.Router();



// router.post('/signup',authController.signup);
// router.post('/login',(req,res)=>{
//     exports.login=async(req,res,next)=>{
//         console.log('login')
//         try{
//             const{email,password ,name}=req.body;

//             const User=await User.find({ email});

//             if(!User) return next(new createError('user not found!',404));
//             const isPasswordvalid=await bcrypt.compare(password,User.password);

//             if(!isPasswordvalid){
//                 return next(new creatError('incorrect email password',401))
//             }
//             const token=jwt.sign({_id:newUser._id},'secretKey123',{
//                 expiresIn:'10d',


//             });
//             res.status(201).json({
//                 status:'success',
//                 message:'User login successfully',
//                 token,
//                 User:{
//                     _id:User._id,
//                     name:User.name,
//                     email:User.email,
//                     role:User.role,
//                 },
//             }) 

//         }catch(error){

//         }
//     };

// });



// module.exports=router;

const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Route for signup
router.post('/signup', async (req, res, next) => {
    // console.log('Requested Body:',req);
    try {
        const { email, password, name, roles,permissions } = req.body;
        const user = await User.findOne({ email: req.body.email });

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email and password are required',
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'fail', message: 'User already exists!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        console.log({
            email,
            password: hashedPassword,
            name,
            roles,
            permissions,
        });


        // Create a new user with hashed password
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            role,
            permissions,
        });

        // Generate a JWT token
        const token = jwt.sign({ _id: newUser._id,name: newUser.name,
            email: newUser.email,
            roles: newUser.roles,
            permissions:newUser.permissions, }, 'secretKey123', { expiresIn: '10d' });

        // Respond with success and token
        res.status(201).json({
            status: 'success',
            message: 'User registered',
            token,
            // user: {
            //     _id: newUser._id,
            //     name: newUser.name,
            //     email: newUser.email,
            //     roles: newUser.roles,
            //     permissions:newUser.permissions,
            // },
        });
    } catch (error) {
        next(error);
    }
});

// Route for login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password, name, roles,permissions } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User not found!" });
        }

        // Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json(('Incorrect email or password'));
        }

        // Generate a JWT token
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            permissions:user.permissions,
        }, 'secretKey123', { expiresIn: '10d' });

        res.status(200).json({
            status: 'success',
            message: 'User login successfully',
            token
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;