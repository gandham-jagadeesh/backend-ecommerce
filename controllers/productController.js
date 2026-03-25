const {db,pg} = require("../db/db");
const {update} = pg.helpers;

// input validation 
const addproduct = async (req,res)=>{
    try{
    const product = req.body.product;
    const {productname,categoryid,quantity,description,price,pic} = product;
    const insertedProduct = await db.one("insert into products(productname,categoryid,quantity,description,price,pic) values($1,$2,$3,$4,$5,$6) returning productname,categoryid,quantity,description,price,pic",[productname,categoryid,quantity,description,price,pic]);
    return res.status(201).json({ status:"success",data:insertedProduct});
    }   
    catch(e){
        if(e.code == "23503"){
            return res.status(400).json({
                status:"error",
                message:"Invalid category"
            });
        }
       return res.status(500).json({
        status:"error",
        message:"Internal Server error"
       })
    }
}

const addcategory = async (req,res)=>{
   const category = req.body.category; 
   const insertedCategory = await db.one("insert into category(categoryname) values($1) returning categoryid,categoryname",[category]);
    res.status(201).json({
        data:insertedCategory
    });
}

const removeProduct = async (req, res)=>{
    const productId = req.params.productid;
    const removedproduct = await db.oneOrNone("delete from products where productid = $1 ",[productId]);
    res.status(200).json({
        msg:"product deleted sucessfully",
        data:removedproduct
    })
}
const modifyProduct = async (req,res)=>{
    const productId = req.params.productid;
    const productcols   = req.body.product;
    const updateQuery = update(productcols,null,"products");
    const whereClause =  " where productid = $1 returning *"
    const query = updateQuery + whereClause;
     await db.oneOrNone(query,[productId]);
    res.status(200).json({
        msg:"modified product sucessfully",
     }); 
}

const getproduct = async (req,res)=>{
    const productId = req.params.productid;
    const product  = await  db.oneOrNone("select * from products where productid = $1",productId);
    res.status(200).json({
        data:product
    });
}


const allproducts = async (req,res)=>{
    const products = await db.manyOrNone("select * from products");
    res.status(200).json({
        data:products
    });
}

module.exports = {
    addproduct,
    addcategory,
    removeProduct,
    modifyProduct,
    getproduct,
    allproducts
}