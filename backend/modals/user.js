const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

// presave hook

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// schema has to be converted to model 

const user= mongoose.model("userSchema",userSchema);
module.exports = user;
