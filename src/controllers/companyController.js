const { createCompanyService, getCompanyService, getCompanyServiceById, updateCompanyServiceById, bulkUpdateCompanyService, deleteCompanyService, bulkDeleteCompanyService } = require("../services/companyService")

exports.createCompany = async(req,res,next)=>{
    try {


        const result = await createCompanyService(req.body);

        res.status(200).json({
            status:"Success",
            message:"Successfully created data.",
            result
            
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't create data",
            error:error.message
        })
    }
}

exports.getCompany = async(req,res,next)=>{
    try {


        const result = await getCompanyService();

        res.status(200).json({
            status:"Success",
            message:"Successfully fetch data.",
            result
            
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't fetch data",
            error:error.message
        })
    }
}

exports.getCompanyById = async(req,res,next)=>{
    try {
        
        const {id} = req.params;

        const result = await getCompanyServiceById(id);

        res.status(200).json({
            status:"Success",
            message:"Successfully fetch data.",
            result
            
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't fetch data",
            error:error.message
        })
    }
}

exports.updateCompanyById = async(req,res,next)=>{
    try {
        
        const {id} = req.params;

        const result = await updateCompanyServiceById(id,req.body);

        res.status(200).json({
            status:"Success",
            message:"Successfully updated data.",
            result
            
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't updated data",
            error:error.message
        })
    }
}

exports.bulkUpdateCompany = async(req,res,next)=>{
    try {
        
        const result = await bulkUpdateCompanyService(req.body);

        res.status(200).json({
            status:"Success",
            message:"Successfully updated data.",
            result
            
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't updated data",
            error:error.message
        })
    }
}

exports.deleteCompanyById = async(req,res,next)=>{
    try {

        const {id} = req.params;
        
        const result = await deleteCompanyService(id);

        res.status(200).json({
            status:"Success",
            message:"Successfully deleted data.",
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't deleted data",
            error:error.message
        })
    }
}

 
exports.bulkDeleteCompany= async(req,res,next)=>{
    try {        
        const result = await bulkDeleteCompanyService(req.body.ids);

        if(!result.deletedCount){
            return res.status(400).json({
                status:"Fail",
                error:"Couldn't delete the data"
            })
        }

        res.status(200).json({
            status:"Success",
            message:"Successfully deleted data.",
        })
        
    } catch (error) {
        res.status(400).json({
            status:"Fails",
            message:"Couldn't deleted data",
            error:error.message
        })
    }
}

