const customError = require("../utilites/appError");
const db = require("../db/db").db;


const addProduct  = async ({product_name,category_id,quantity,description,price,pic})=>{
    if( typeof product_name != "string" || product_name.trim() == ""){
        throw new customError(400,"Invalid product_name");
    }
    if( typeof category_id != "string" || category_id.trim() == ""){
        throw new customError(400,"Invalid category_id");
    }

    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(Number(price).toFixed(2));
    const name = product_name.trim();

    if(!Number.isInteger(parsedQuantity)  || parsedQuantity < 0 || parsedQuantity  > 1_000_000 ){
        throw new customError(400,"Invalid quantity");
    }
    if(typeof description != "string" || description.trim() == ""){
        throw new customError(400,"Invalid description");
    }
    const desc = description.trim();

    if( !Number.isFinite(parsedPrice) || parsedPrice <= 0 ){
        throw new customError(400,"Invalid Price");
    }
    if( pic != null &&  typeof pic != "string"){
        throw new customError(400,"Invalid pic");
    }
    const safepic = pic &&  pic.trim() !== "" ? pic.trim() : null;

    try{
        const product = await db.one("insert into products(product_name,category_id,quantity,description,price,pic) values($1,$2,$3,$4,$5,$6) returning product_id,product_name,category_id,quantity,description,price,pic",[name,category_id,parsedQuantity,desc,parsedPrice,safepic]);
        return product;
    }
    catch(e){
    if(e.code === "23505"){
        throw new customError(409,"Product already exists");
    }

    if (e.code === "23503") {
        throw new customError(400, "Invalid category");
     }
        throw e;
    }
}

const updateProduct = async (productId,product)=>{
    const updatedObject = {};
    if(product.product_name != undefined){
        if(typeof product.product_name != "string" || product.product_name.trim() === ""){
            throw new customError(400,"invalid product_name");
        }
        
        updatedObject.product_name = product["product_name"].trim();
    }
    if(product.category_id != undefined){
        if(typeof product.category_id != "string"){
            throw new customError(400,"invalid category id");
        }
        updatedObject.category_id = product.category_id;
    }
    if(product.quantity != undefined){
        const parsedQuantity = Number(product.quantity);
        if( !Number.isInteger(parsedQuantity)  || parsedQuantity < 0 || parsedQuantity > 1_000_000){
            throw new customError(400,"invalid quantity");
        }
        updatedObject.quantity = parsedQuantity;
    }
    if(product.description != undefined){
        if( typeof product.description != "string" || product.description.trim() === "" ){
            throw new customError(400,"invalid description");
        }
        updatedObject.description = product.description.trim();
    }
    if(product.price != undefined){
        const parsedPrice = Number(Number(product.price).toFixed(2));;
        if(!Number.isFinite(parsedPrice) || parsedPrice <= 0 ){
            throw new customError(400,"invalid price");
        }
        updatedObject.price = parsedPrice;
    }
    if(product.pic != undefined){
        if( product.pic != null && typeof product.pic != "string"){
            throw new customError(400,"invalid pic");
        }
        updatedObject.pic = product.pic && product.pic.trim() != "" ? product.pic.trim()  : null; 
    }
    const keys  = Object.keys(updatedObject)
    const vals  = keys.map((key)=>updatedObject[key]);
    const setstring = keys.map((element,index)=> {
        return `${element} = $${index+1}`
    }).join(", ");
    if(keys.length == 0){
        throw new customError(400,"No valid fields to update");
    }
    const length = vals.length;
    const query = `update products set ${setstring}, modified_at = now()  where product_id =$${length+1} returning product_id,product_name,category_id,quantity,description,price,pic` 
    try{
    const data = await db.oneOrNone(query,[...vals,productId]);
    if(!data){ throw new customError(404,"product not exists");}
    return data;
    }
    catch(e){
        if(e.code === "23505"){
            throw new customError(409,"product already exists")
        }
        throw e;
    }
}

const deleteProduct = async (product_id)=>{
    if(!product_id){
        throw new customError(400,"product id missing");
    }
    if(typeof product_id != "string"){
        throw new customError(400,"product_id must be uuid");
    }
    console.log(product_id);
    try{
    const deletedData = await db.oneOrNone("delete from products where product_id = $1 returning *",[product_id]);
    if(!deletedData){
        throw new customError(404,"product does not exist");
    }
    return deletedData;
 }
  catch(e){
    throw e;
  } 
}

const getProduct = async(product_id)=>{
     if(!product_id){
        throw new customError(400,"product id missing");
    }
    if(typeof product_id != "string"){
        throw new customError(400,"product_id must be uuid");
    }
     try{
    const productData = await db.oneOrNone("select *  from products where product_id = $1",[product_id]);
    if(!productData){
        throw new customError(404,"product does not exist");
    }
    return productData;
 }
  catch(e){
    throw e;
  } 
}
const getAllProducts  = async (req,res)=>{
    try{
        const allproducts = await db.manyOrNone("select * from products");
        return allproducts;
    }
    catch(e){
        throw e;
    }
}
 module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
 }