const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const test = (req, res) => {
    res.json('Test is working');
}
//Registered Endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email) {
            return res.json({
                error: 'Email is required'
            })
        }
        //check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        }
        //check if Password was not good
        if (!password || password < 6) {
            return res.json({
                error: 'Password is Required and Should be at least 6 characters'
            })
        }
        //check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }
        const hashedPassword = await hashPassword(password)
        //Create User database
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.json(user);
    }
    catch (error) {
        console.log(error);
    }
}
//Login EndPoint
const loginUser=async (req,res)=>
    {
       try {
        const {email,password}=req.body;
        //check if user exists
        const user=await User.findOne({email});
        if(!user)
            {
                return res.json({
                    error:'No User found'
                })
            }
            //check if Password Match
            const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            }, (err, token) => {
                if (err) throw err;
                res.json({
                    user,
                    token
                })
            })
        }
        if (!match) {
            res.json({
                error: "Password do not match"
            })
        }
       } catch (error) {
        console.log(error);
       }
    }
    const getProfile = async (req, res) => {
        const { token } = req.query;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) throw err;
                const user = await User.findById(decodedToken.id).select('-password');
                if (user) {
    
                    return res.json(user)
                }
                else {
                    return res.status(404).json({
                        message: 'No user found'
                    })
                }
            })
    
        } else {
            res.json(null);
        }
    }

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
}    