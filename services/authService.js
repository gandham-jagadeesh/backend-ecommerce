
const customError = require("../utilites/appError");
const {valid,hash} = require("../utilites/hash");
const {encode} = require("../utilites/jwt");
const db = require("../db/db").db;

const signin = async ({email,password})=>{
    if(!email || !password){
        throw new customError(400,"Missing Data")
    }
    const user = await db.oneOrNone("select user_id,admin,password from users where email = $1",[email]);
    const dummyhash = "$2b$10$ATdIptNB7sTrqUfQWrQMY.t5MzCJt3.tJ8XKVDJaftRfCFalM6May"
    const hashToCompare = user ? user.password : dummyhash; 
    const isPasswordValid = await valid(password, hashToCompare);
    if(!user || !isPasswordValid){
        throw new customError(401,"Invalid credentials")
    }
    const accesstoken = encode({
        id:user.user_id,
        admin:user.admin
    });

    return {
        access_token:accesstoken,
        type: "bearer"
    }
}

const signup = async ({first_name,last_name,email,password})=>{
    if(!first_name || !last_name || !email || !password){
        throw new customError(400,"Missing fields");
    }
    if(first_name.length < 2){
         throw new customError(400,"first_name too short");
    }
     if(last_name.length < 2){
        throw new customError(400,"last_name too short");
    }
    if(!email.includes("@")){
       throw new customError(400,"invalid email format")
    }
    if(password.length < 7){
        throw new customError(400,"password too weak");
    }
    const hashedPassword = await hash(password);
    normalizedemail = email.toLowerCase();
    try{
        const insertedUser  = await db.one("insert into users(first_name,last_name,email,password) values($1,$2,$3,$4) returning user_id,first_name,last_name,email",[first_name,last_name,normalizedemail,hashedPassword]);
        return insertedUser
    }
    catch(e){
        if(e.code === "23505"){
             throw new customError(409,"email already exists");
        }
        throw e;
    }
}

module.exports = {
    signin,signup
}