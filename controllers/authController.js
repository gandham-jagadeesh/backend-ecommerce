const db = require("../db/db");
const pq = require("pg-promise").ParameterizedQuery;
const {valid,hash} = require("../utilites/hash");
const {encode} = require("../utilites/jwt");

const signin = async (req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await db.oneOrNone("select * from users where email = $1",[email]);
    const isValid = await valid(password,user ? user.password : "$2b$10$abcdefghijklmnopqrstuv1234567890123456789012");
    if (!user || !isValid) {
      return res.status(401).json({
        err: "Invalid credentials"
      });
    }
    const token =  encode({id:user.userid});
    return res.status(200).json({
        token
    });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err:"server error"
        })
    }
};

const signup = async (req,res)=>{
    try{
    const {firstname,lastname,email,password} = req.body;
    const dbres = await db.oneOrNone("select userid  from users where email = $1",[email]);
    if(dbres){
        return res.status(409).json({"err":"email already exists"});
    }
    const hashedPassword = await hash(password);
    const query = new pq("insert into users(firstname,lastname,email,password) values($1,$2,$3,$4) returning firstname,lastname,email");
    query.values = [firstname, lastname, email, hashedPassword];
    const newuser = await db.one(query);
    return res.status(201).json({
        status: "success",
        data: newuser
    });

    }
    catch(err){
        console.log(err);
         res.status(500).json({
            err:"server error"
        });
    }
}

module.exports = {
    signin,
    signup
}