import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req:Request,res:Response)=>{
try{
    const user= req.body.user;
const result= await userServices.createUserintoDB(user);

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
        massage : 'User is get successfully',
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
                    massage : 'User fetched successfully!',
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
                        massage : 'User fetched successfully!',
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

    return res.status(200).json({ message: 'Order added successfully'});
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
                        massage : 'User order get successfully!',
                        data : result.orders
                       })
                  }else{
                    return res.status(404).json({ error: 'User not found' });
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
                            massage : 'User order get successfully!',
                            data :{
                                "totalPrice": totalPrice
                            } 
                           })
                      }else{
                        return res.status(404).json({ error: 'User not found' });
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