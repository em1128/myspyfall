const { NextFunction, Request, Response } = require('express');
const UserService = require('../services/userService');
const Utils = require('../util/utils');
const { UserCol } = require('../constant/defineConst');

class UserController{
    constructor(){}

    /**
     * addUser
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    addUser = async (req, res, next) => {
        try{
            const body = req.body;
            const user = Utils.getColList(body, UserCol);
            const result = await UserService.addUser(user);
            return res.json({ success: true, message: `Add User(s) Success!`});
        }catch(err){
            console.log('error : ' + err);
        }
    }

    getUsers = async (req, res, next) => {
        try{
            const result = await UserService.getUsers();
            return res.json(result);
        }catch(err){
            console.log('error : ' + err);
        }
    }

}
module.exports = new UserController();