module.exports = class customError extends Error{
    constructor(status,msg){
        super(msg);
        this.status = status;
    }
}