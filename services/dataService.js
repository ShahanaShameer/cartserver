const db=require('./db')

//get all the products from db

const getProducts =()=>{
   return db.Product.find().then(
    (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                products:result
            }
        }
        else{
            return{
                status:false,
                statusCode:404,
                message:'No products found'  
            } 
        }
    }   )
}
//to add wishlist data
const addtowishlist=(id,title,price,image,description)=>{
    //data added to mongodb -- create a model in db.js
    return db.wishlist.findOne({id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"Product already exists"
                }
            }
            else{
                const newProduct = new db.wishlist({id,title,price,image,description})
                newProduct.save()//to save data into mongodb
                return{
                    status:true,
                    statusCode:200,
                    message:"Product added to wishlist"
                }
    

            }
        }
    )
    
}

//to gegt wishlist data
const getwishlist=()=>{
   return db.wishlist.find().then(
    (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                products:result
            }
        }
        else{
            return{
                status:false,
                statusCode:404,
                message:'Your wishlist is empty'  
            }  
        }
    }
   ) 
}

deletewish=(id)=>{
    return db.wishlist.deleteOne({id}).then(
        (result)=>{
            if(result){
                // return{
                //     status:true,
                //     statusCode:200,
                //     wishlist:result,
                //     message:"product removed"
                // }
            // 
            return db.wishlist.find().then(
                (result)=>{
                    if(result){
                        return{
                            status:true,
                            statusCode:200,
                            message:"Product removed successfully"
                        }
                    }
                    else{
                        return{
                            status:false,
                            statusCode:404,
                            message:'Product not found'  
                        }  
                    }
                }
               ) 
            }
        else{
            return{
                status:false,
                statusCode:404,
                message:'Product not found'  
            }  
        }
    
    }
    )
}

module.exports={
    getProducts,
    addtowishlist,
    getwishlist,
    deletewish
}