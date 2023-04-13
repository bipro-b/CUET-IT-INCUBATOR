const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};

exports.getCategoryService = async () => {
  const result = await Category.find({}).populate('companies');
  return result;
};

exports.updateCategoryService = async (id, data) => {
    const updatedResult = await Category.updateOne(
        {_id:id},
        {
            $set:data
        },
        {runValidators: true}
    )
    return updatedResult;
};

exports.deleteCategoryService= async(id)=>{
    const deleted = await Category.deleteOne({_id:id});
    return deleted;
}

