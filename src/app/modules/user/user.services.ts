import { User } from "./user.interface";
import { Usermodel } from "./user.model";

const createUserintoDB=async(user:User)=>{
const result = await Usermodel.create(user)
return result;
}
const getUserintoDB=async()=>{
    const result = await Usermodel.find()
    return result;
    }
const getUserbyId=async(id:number)=>{
const result = await Usermodel.findOne({userId:id})
return result;
}
const getUserbyIdAndUpdate=async(id:number,user:User)=>{
const query={userId:id}
const result = await Usermodel.findOneAndUpdate(query,user)
return result;
 }
 const getUserbyIdAndDelete=async(id:number)=>{
    const result = await Usermodel.findOneAndDelete({userId:id})
    return result;
     }
export const userServices={
    createUserintoDB,
    getUserintoDB,
    getUserbyId,
    getUserbyIdAndUpdate,
    getUserbyIdAndDelete
}