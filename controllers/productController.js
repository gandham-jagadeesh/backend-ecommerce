const db = require("../db/db");

const addproduct = async (req,res)=>{
    const product = req.body.product;
    const {productname,categoryid,quantity,description,price,pic} = product;
    const insertedProduct = await db.one("insert into products(productname,categoryid,quantity,description,price,pic) values($1,$2,$3,$4,$5,$6) returning  productid productname,categoryid,quantity,description,price,pic",[productname,categoryid,quantity,description,price,pic]);
    return insertedProduct;
}

const addcategory = async (req,res)=>{
   const category = req.body.category; 
    const insertedCategory = await db.one("insert into category(categoryname) values($1) returning categoryname",[category]);
    console.log(insertedCategory);
    res.status(201).json({
        data:insertedCategory
    })
}
const removeProduct = (productid)=>{

}

const modifyProduct = (productid,product)=>{

}

const getproduct = ()=>{

}


const allproducts = ()=>{

}

module.exports = {
    addproduct,
    addcategory
}