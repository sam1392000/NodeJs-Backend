 const userSchema = require('../modals/user');
 const bcrypt = require('bcrypt');
 exports.getuser = (req,res) => {
    userSchema.find().exec().then((users) => {
        res.status(200).json({users})
    }).catch(() => {
        res.status(500).send({error:"Something went wrong"})
    })
}

exports.adduser = (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
   if(name.length != 0 && email.length != 0 && password.length != 0)
   {
        const user = new userSchema({
            name:name,
            email:email,
            password:password
        })
        user.save((err,result) => {
            if(err)
                return res.status(300).json({err})
            console.log(result);
            res.status(200).json({result});
        })
   }
   else return res.status(300).json({msg:"Invalid"});
}

exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    userSchema.findOne({email:email},function(err,record){
        if(record == undefined)
            return res.status(500).send({msg:"Invalid email address"});
        const hashed_password = record.password;
        bcrypt.compare(password,hashed_password,function(err,result){
            if(result == false)
                return res.status(500).json({msg:"Invalid password"});
            return res.status(200).json({email:record.email,password:record.password,allowInside:true});
        })


    })
}

exports.getsingleuser = (req,res)=> {
    const id = req.params.id;

    userSchema.findById(id).exec().then((user) => {
        return res.status(200).json({user})
    }).catch(() => {
        return res.status(400).json({error:"No user"});
    })
}

exports.deleteuser = (req,res) => {
    const id = req.body.id;
    userSchema.deleteOne({_id:id}).exec().then(data => { // in response data there will be a value called n and deletedCount .If n and //deletedcount is 1 the record is deleted else not deleted
        return res.status(200).json({data})
    }).catch(()=>{
        return res.status(400).send({msg:"No user with this id"});
    })
}

exports.update = (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    userSchema.findByIdAndUpdate(id,{
        name:name,
        email:email,
        password:password
    },function(err,data){
        if(err)
        {
            console.log(err)
            return;
        }else{
            userSchema.findById(id).exec().then((user) => {
                return res.status(200).json({user})
            }).catch(() => {
                return res.status(400).json({error:"No user"});
            })
        }
            
        
    })
}



exports.deletecookie = (req,res) => {
    res.clearCookie('name');
    res.status(200).json({
        msg:"Sucessfully deleted"
    })
}