const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//schema
const authUserSchema = new Schema({
    email : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type: String,
        required : true,
    },
    publicKey : {
        type: String,
    }
});

// userSchema.pre('save',async function(next){
//     try{
//         const salt = await bcrypt.genSalt(10);
//         const passwordHash = await bcrypt.hash(this.password,salt);
//         this.password = passwordHash;
//         next();
//     } catch(error){
//         next(error);
//     }
// })

authUserSchema.methods.isValidPassword = async function(newPassword) {
    try{
        return await bcrypt.compare(newPassword,this.password);
    }catch(error){
        throw new Error(error);
    }
}

//Create model
const AuthUser = mongoose.model('authUser',authUserSchema);

//export model
module.exports = AuthUser;
