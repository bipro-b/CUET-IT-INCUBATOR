const Company = require("../models/Company")

exports.createCompanyService = async(data)=>{
    const company = await Company.create(data)
    return company;
}


exports.getCompanyService = async()=>{
    const company = await Company.find({})
    return company;
}
exports.getCompanyServiceById = async(id)=>{
    const company = await Company.findOne({_id:id})
    return company;
}

exports.updateCompanyServiceById = async(id,data)=>{
    const company = await Company.updateOne(
        {_id:id},
        {
            $set:data
        },
        {runValidators: true}
    )
    return company;
}


exports.bulkUpdateCompanyService = async(data)=>{
    const updateOperations = data.map(company => ({
        updateOne: {
          filter: { _id: company._id }, 
          update: { $set: company }, 
        }
      }));
    
      const updateCompanies = await Company.bulkWrite(updateOperations);
    
      return updateCompanies;
 }

 exports.deleteCompanyService = async(id)=>{
    const deletedCompany = await Company.deleteOne({_id:id});
    return deletedCompany;
 }

 exports.bulkDeleteCompanyService = async(ids)=>{
    const result = await Company.deleteMany({_id:ids});
    return result;
 }