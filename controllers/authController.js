const db = require("../db/db");
const pq = require("pg-promise").ParameterizedQuery;

const signin = (req,res)=>{

}

const signup = async (req,res)=>{
    const {firstname,lastname,email,password} = req.body;
    const uuid = "3f8a9c6e-2b1d-4e7a-9c5d-6f2b8a1e4c90"
    const dbres = await db.any("select * from users where email = $1",[email]);
    if(dbres.length > 0){
        res.status(409).json({"err":"email already exists"});
        return;
    }
    const query = new pq("insert into users(userid,firstname,lastname,email,password) values($1,$2,$3,$4,$5) returning firstname,lastname,email,password");
    query.values = [uuid,firstname, lastname, email, password];
    const newuser = await db.one(query);
    return res.status(201).json({
        status: "success",
        data: newuser
    });
}

module.exports = {
    signin,
    signup
}