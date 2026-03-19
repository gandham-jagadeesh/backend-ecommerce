const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (password)=>{
    const passwordHash = await bcrypt.hash(password,saltRounds);
    return passwordHash; 
}

const valid = async(password,hashed)=>{
    const isValid = bcrypt.compare(password,hashed);
    return isValid;
}

module.exports = {
    hash,valid
}