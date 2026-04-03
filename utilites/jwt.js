const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const encode = (payload)=>{
    const token = jwt.sign(payload,secret,{ expiresIn:24*60*60});
    return token;
};

const verify = (token)=>{
     return jwt.verify(token,secret);
}

module.exports = {
    encode,
    verify
}