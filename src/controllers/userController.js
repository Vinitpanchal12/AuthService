const UserService = require('../services/userService');

const userService = new UserService();

const create = async(req, res) =>{
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data:response,
            message:'successfully created a user',
            success:true,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:'something wrong at creating user',
            success:false,
            err: error
        });
    }
}

const signIn = async(req, res) =>{
    try {
        const response = await userService.signIn(
             req.body.email,
             req.body.password
        );
        return res.status(200).json({
            data:response,
            message:'successfully signed in',
            success:true,
            err: {} 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:'something wrong during signin',
            success:false,
            err: error
        });
    }
}

const isAuthenticated = async(req, res) =>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data:response,
            message:'successfully authenticated the user',
            success:true,
            err: {} 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:'something wrong during authentication',
            success:false,
            err: error
        });
    }
}
module.exports= {
    create,signIn,isAuthenticated
}