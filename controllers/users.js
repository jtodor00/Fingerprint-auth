const JWT = require('jsonwebtoken');
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');
var crypto = require('crypto');

const User = require('../models/user');
const AuthUser = require('../models/authUser');

const { JWT_SECRET } = require('../configuration/config'); 

signToken = user => {
    return token = JWT.sign({
        iss: 'FingerprintAuthentication',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1 ),
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        const email = req.value.body.email;
        const password = req.value.body.password;
        //check if user exists
        const foundAuthUser = await AuthUser.findOne({ email });
        if(foundAuthUser){
            return res.status(403).send({error : "Email is already in use"});
        }
        const foundUser = await User.findOne({ email});
        if(foundUser){
            const isPasswordValid = await foundUser.isValidPassword(password);
            if(!isPasswordValid)
                return res.status(401).send({error: "User already exists. Passwords do not match."})   
            await User.remove({email});
        }

        var secret = speakeasy.generateSecret({ length: 30 });
        //create user
        const newUser = new User({ email, password, secret : secret.base32 });
        await newUser.save();

        var data = {
            secret : newUser.secret,
            email : newUser.email,
        }
        var data_url = await QRCode.toDataURL(JSON.stringify(data));
        res.status(200).json({data_url});
    },

    registerDevice: async(req, res, next) => {
        let data = req.body;
        let verify = crypto.createVerify('SHA256');
        let objectToVerify = {...data};
        delete objectToVerify.signature;
        let verifyString = JSON.stringify(objectToVerify);
        let PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n"+data.publicKey+"\n"+"-----END PUBLIC KEY-----";
        verify.write(verifyString);
        var isSignatureValid = verify.verify(PUBLIC_KEY,data.signature,'base64');
        if(!isSignatureValid)
            return res.status(401).send({error : "Signature is not valid"});
        const foundAuthUser = await AuthUser.findOne({ email : data.email })
        if(foundAuthUser){
            return res.status(403).send({error : "Email already asociated with device."});
        }
       
        const foundUser = await User.findOne({ email:data.email });
        if(!foundUser){
            return res.status(404).send({error : "User you are trying to associate with device does not exist. Try creating an account first."});
        }
        if(foundUser.secret != data.secret){
            return res.status(401).send({error : "Not authorized."});
        }
      
        const newAuthUser = new AuthUser({ email : foundUser.email, password:foundUser.password, publicKey : data.publicKey });
        await newAuthUser.save();
        await foundUser.remove();

        res.status(200).json("User succesfully linked with your device!");
    },

    signIn: async(req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    

    secret: async(req, res, next) => {
        res.json({resource : "secret"});
    }
}