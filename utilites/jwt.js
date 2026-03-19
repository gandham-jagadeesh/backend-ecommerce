const jwt = require("jsonwebtoken");
const secret = "i am in idiot";

const encode = (payload)=>{
    const token = jwt.sign(payload,"i am in idiot",{ expiresIn:24*60*60});
    return token;
};

const verify = (token)=>{
    const {id} = jwt.verify(token,secret);
    return id;
}
module.exports = {
    encode,
    verify
}