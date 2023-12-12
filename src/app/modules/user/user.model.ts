import { Schema, model } from "mongoose";
import { Address, Fullname, Order, User } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";

const FullnameSchema= new Schema<Fullname>({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      }
});
const AddressSchema= new Schema<Address>({
    street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
});
const OrderSchema = new Schema<Order>({
    productName: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
})
const Userschema= new Schema<User>({
    userId:{
      type : Number,
      required: true
    },
    username:{
        type : String,
        required: true,
        unique: true
    },
    password:{type:String,required:true},
    fullName:{
      type: FullnameSchema,
      required:true  
    },
    age:{type: Number,required:true},
    email:{
      type: String,    
      required:true,
      unique:true
    },
    isActive:{
        type: Boolean,
      default: true
    },
    hobbies:{
        type: [String],
    required: true
    },
    address:{
        type: AddressSchema,
        required: true  
    },
    orders:{
        type: [OrderSchema] 
    }
});
Userschema.pre('save', async function(next){
  const user = this;
  const saltRounds=12;
  user.password= await bcrypt.hash(user.password,saltRounds);
  next();
})
Userschema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export const Usermodel= model<User>('User', Userschema);