const CartModel = require("../models/CartModel");
const mongoose = require("mongoose");
const ObjectID= mongoose.Types.ObjectId

exports.SaveCartListService = async(req) =>{
    try {
        const user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = user_id;

        await CartModel.create(reqBody);
        return {status:"success", message:"Product Added to Cart"}





    } catch (error) {
        return {status:"fail", message:"Something Went Wrong !"}
    }
}



exports.RemoveCartListService = async(req) =>{
    try {
        const reqBody = req.body;
        await CartModel.deleteOne(reqBody)
        return {status:"success", message:"Product Delete from Cart"}


    } catch (error) {
        return {status:"fail",  message:"Something Went Wrong !"}
    }
}




exports.CartListService = async(req) =>{
    try {
      const user_id = new ObjectID(req.headers.user_id);
      const MatchStage = {$match: {userID: user_id }};

      const JoinProductStage = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}}
      const UnwindProductStage ={$unwind: "$product"};

      const JoinBrandStage = {$lookup: {from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"}}
      const UnwindBrandStage ={$unwind: "$brand"};

      const JoinCategoryStage = {$lookup: {from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category"}}
      const UnwindCategoryStage ={$unwind: "$category"}


      const data = await CartModel.aggregate([
        MatchStage,
        JoinProductStage, UnwindProductStage,
        JoinBrandStage, UnwindBrandStage,
        JoinCategoryStage, UnwindCategoryStage
      ]);
       
      return {status:"success",data:data}
        
    } catch (error) {
        return {status:"fail",message:"Something Went Wrong !"}
    }
}



exports.UpdateCartListService = async(req) =>{
    try {
        const cartID = req.params.cartID;
        const user_id = req.headers.user_id;
        const reqBody = req.body;

        await CartModel.updateOne({_id: cartID, userID: user_id }, {$set: reqBody })
        return {status:"success", message:"Product Updated Successfully"}


    } catch (error) {
        return {status:"fail",  message:"Something Went Wrong !"}
    }
}