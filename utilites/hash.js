const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (password)=>{
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    return hashedPassword; 
}

const valid = async(password,hashed)=>{
    const isValid = bcrypt.compare(password,hashed);
    return isValid;
}

module.exports = {
    hash,valid
}