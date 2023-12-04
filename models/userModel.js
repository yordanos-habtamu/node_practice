const mongoose=require('mongoose')
const roleSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    permission:[{
        type: String,
        enum: ['read', 'write', 'admin'],
      }],
})
const Role=mongoose.Model('Role',roleSchema)
const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
        required:true
    }  
})
const user=mongoose.Model('user',userSchema)
const postSchema=mongoose.Schema({
    article:{
       Title:{
        type:String,
        required:true
       },
       content:{
        type:mongoose.Schema.Types.Text,
        required:true
       }
    },
    author:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user',
       required:true
    }
})
const post=mongoose.Schema('post',postSchema)
module.exports={user,post,Role}