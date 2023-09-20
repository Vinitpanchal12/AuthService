const validateUserAuth = (req, res, next ) =>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data:{},
            message:"something wrong",
            success: false,
            err:'email or password is missing in request' 
        });
    }
    next();
}

const validateIsAdmin = (req, res, next ) =>{
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            message:"something wrong",
            success: false,
            err:'USerid is missing in request' 
        });
    }
    next();
}
module.exports ={
    validateUserAuth,validateIsAdmin
}