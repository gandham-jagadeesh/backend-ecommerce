const { db } = require("../db/db");
const customError = require("../utilites/appError")

const addCategory = async ({category_name})=>{
    if( !category_name){
        throw new customError(400,"missing fields");
    }
    if(typeof category_name != "string"){
        throw new customError(400,"categroy_name should of string");
    }
    const cname = category_name.trim();
    if(cname.length < 3){
        throw new customError(400,"category name must be more than length 2")
    }
    try{
    const insertedCategory = await db.one("insert into categories(category_name) values($1) returning category_id,category_name",[cname]);
    return insertedCategory; 
   }
    catch(e){
        if(e.code  === "23505"){
            throw new customError(409,"category already exists");
        }
        throw e;
    }
}

const updateCategory = async ({category_id,category_name})=>{
    if(!category_id || !category_name){
        throw new customError(400,"missing fields");
    }
    if( typeof category_id != "string" || typeof category_name != "string"){
        throw new customError(400,"the data should of type string ");
    }
    const cname = category_name.trim();
    if(cname.length < 3){
        throw new customError(400,"category name must be more than length 2 ");
    }
    try{
    const insertedCategory = await db.oneOrNone("update categories set category_name = $1 where category_id  = $2 returning category_id,category_name",[cname,category_id]);
    if(!insertedCategory){
        throw new customError(404,"category with category_id not found");
    }
    return insertedCategory;
    }
    catch(e){
        if(e.code === "23505"){
            throw new customError(409,"category already exists");
        }
        throw e;
    }
}

const deleteCategory = async ({category_id})=>{
    if(!category_id){
        throw new customError(400,"missing fields");
    }
    if(typeof category_id != "string"){
        throw new customError(400,"category_id must of type string");
    }
    try{
     const deletedCategory = await db.oneOrNone("delete from categories where category_id = $1 returning category_id,category_name",[category_id]);
    if(!deletedCategory){
        throw new customError(404,"the category not found");
    }
    return deletedCategory;
    }
    catch(e){
        throw e;
    }
}

const getAllcategories = async ()=>{
    try{
        const cgs = await db.manyOrNone("select category_id,category_name from categories");
        return cgs;
    }
    catch(e){
        throw e;
    }
}

const getCategory = async  ({category_id}) =>{
    if(!category_id){
        throw new customError(400,"missing fields");
    }
    if(typeof category_id !== "string"){
        throw new customError(400,"category_id must be of type string");
    }
    try{
        const cg = await db.oneOrNone("select * from categories where category_id = $1",[category_id]);
        if(!cg){
            throw new customError(404,"category does not exists");
        }
        return cg;
    }
    catch(e){
        throw e;
    }

}

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllcategories,
    getCategory
}