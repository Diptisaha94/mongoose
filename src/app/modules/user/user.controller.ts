import { Request, Response } from "express";
import { userServices } from "./user.services";
import UserJoiSchema from "./joi.validation";

const createUser = async (req:Request,res:Response)=>{
try{
    const user= req.body.user;
    const { error } = UserJoiSchema.validate(user)
const result= await userServices.createUserintoDB(user);
if(error){
    res.status(500).json({
        success : false,
        massage : 'Something went wrong',
        error : error
       }) 
}
   res.status(200).json({
    success : true,
    massage : 'User is created successfully',
    data : result
   })
}catch(err){
    console.log(err)
}
}
const getUser = async (req:Request,res:Response)=>{
    try{
    const result= await userServices.getUserintoDB();
    
       res.status(200).json({
        success : true,
        massage : 'Users fetched successfully!',
        data : result
       })
    }catch(err){
        console.log(err)
    }
    }
    const getsingleUser = async (req:Request,res:Response)=>{
        try{
            const userId= parseInt(req.params.userId);
        const result= await userServices.getUserbyId(userId);
        
            res.status(200).json({
                success : true,
                massage : 'User fetched successfully!',
                data : result
               })
            
        }catch(err){
            console.log(err)
        }
        }
        const getUserAndUpdate = async (req:Request,res:Response)=>{
            try{
                const userId= parseInt(req.params.userId);
                const updateUser=req.body.user;
            const result= await userServices.getUserbyIdAndUpdate(userId,updateUser);
            
              if(result){
                res.status(200).json({
                    success : true,
                    massage : 'User updated successfully!',
                    data : result
                   })
              }else{
                res.json({
                    success : false,
                    massage : 'User not found',
                })
              }
            }catch(err){
                console.log(err)
            }
            }
            const userDelete = async (req:Request,res:Response)=>{
                try{
                    const userId= parseInt(req.params.userId);
                const result= await userServices.getUserbyIdAndDelete(userId);
                
                if(result){
                    res.status(200).json({
                        success : true,
                        massage : 'User deleted successfully!',
                        data : null
                       })
                  }else{
                    res.json({
                        success : false,
                        massage : 'User not found',
                    })
                  }
                }catch(err){
                    console.log(err)
                }
                }
const findUserAndUpdateOrder = async (req:Request,res:Response)=>{
    try{
        const userId= parseInt(req.params.userId);
        const updateUserOrder=req.body;
        const result= await userServices.getUserbyIdAndUpdateOrder(userId);
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
          }
        if (result.orders && result.orders.length > 0) {
            result.orders.push(updateUserOrder);
          } else {
            result.orders = [updateUserOrder];
          }
          await result.save();

    return res.status(200).json(
        {
            "success": true,
            "message": "Order created successfully!",
            "data": null
        }
    );
            }catch(err){
                console.log(err);  
            }
            }
            const getsingleUserOrder = async (req:Request,res:Response)=>{
                try{
                    const userId= parseInt(req.params.userId);
                const result= await userServices.getUserbyIdAndOrder(userId);
                if (result) {
                    res.status(200).json({
                        success : true,
                        massage : 'Order fetched successfully!',
                        data : result.orders
                       })
                  }else{
                    return res.status(404).json({
                        "success": false,
                        "message": "User not found",
                        "error": {
                            "code": 404,
                            "description": "User not found!"
                        }
                    });
                  }
                    
                }catch(err){
                    console.log(err)
                }
                }
                const getsingleUserOrderPrice = async (req:Request,res:Response)=>{
                    try{
                        const userId= parseInt(req.params.userId);
                    const result= await userServices.getUserbyIdAndOrder(userId); 
                    if (result) {
        
                        const subtotals=result.orders?.map(order => order.price * order.quantity);
                        const totalPrice = subtotals?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                        res.status(200).json({
                            success : true,
                            massage : 'Total price calculated successfully!',
                            data :{
                                "totalPrice": totalPrice
                            } 
                           })
                      }else{
                        return res.status(404).json({
                            "success": false,
                            "message": "User not found",
                            "error": {
                                "code": 404,
                                "description": "User not found!"
                            }
                        });
                      }
                        
                    }catch(err){
                        console.log(err)
                    }
                    }
export const userController = {
    createUser,
    getUser,
    getsingleUser,
    getUserAndUpdate,
    userDelete,
    findUserAndUpdateOrder,
    getsingleUserOrder,
    getsingleUserOrderPrice
}