const categoryService = require("../services/categoryService");

const addCategory = async (req,res)=>{
   const category = req.body;
   const insertedCategory = await categoryService.addCategory(category);
   return res.status(201).json({
    status:"success",
    data:insertedCategory
   });
}

const getCategory = async (req,res)=>{
    const category_id  = req.params.category_id;
    console.log(category_id);
    const data = await categoryService.getCategory({category_id});
    return res.status(200).json({
        status:"success",
        data:data
    });

}
const deleteCategory = async  (req,res)=>{
    const category_id  = req.params.category_id;
    const data = await  categoryService.deleteCategory({category_id});
    return res.status(200).json({
        status:"success",
        data:data
    });
}

const getAllCategories = async (req,res)=>{
    const data = await categoryService.getAllcategories();
    return res.status(200).json({
        status:"success",
        data:data
    });
};


const updateCategory = async (req,res)=>{
    const category_id = req.params.category_id;
    const category_name    = req.body?.category_name;
    const updatedCategory = await categoryService.updateCategory({category_id,category_name});
    return res.status(200).json({
        status:"success",
        data:updatedCategory
    })
}

module.exports = {
    addCategory,
    getCategory,
    deleteCategory,
    getAllCategories,
    updateCategory
}