const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/user.js");
require("dotenv").config();


//featch data

exports.welcome=async(req,res)=>{
    try{
      
        const datafeatch=await User.find({})

        res.status(200)
        .json({
            success:true,
            data:datafeatch,
            message:"API successfully called",
        });

    }catch{
        console.log(error);
        return res.status(500).json({
          success:false,
          message:'server error',
      });

    }
}
//signup
exports.signup = async (req,res) => {
    try{
       
        const {name, email, password, phone_number} = req.body;
        
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

       
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }


        const user = await User.create({
            name,email,password:hashedPassword,phone_number
        })

        return res.status(200).json({
            success:true,
            message:'Signed up successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered',
        });
    }
}


//login
exports.login = async (req,res) => {
    try {

   
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details',
            });
        }

        let user = await User.findOne({email});
      
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
       
        };
       
        if(await bcrypt.compare(password,user.password) ) {
         
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }

            res.cookie("Cookie", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'hewwo',
            });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Fail',
        });

    }
}


//edit phone_Number
exports.Edit= async(req,res)=>{
        try{
          const {id}=req.params;
          const {phone_number,currentNumber}=req.body;

          const user= await User.findOneAndUpdate({phone_number:currentNumber},{phone_number:phone_number})
         

       
        res.status(200).json({
            success:true,
            data:user,
            message:`Phone number changed / added successfully`
        })

        }catch(error){
          console.log(error);
          return res.status(500).json({
            success:false,
            message:'server error',
        });

        } 
}