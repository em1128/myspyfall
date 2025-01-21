const { User } = require('../models');
const UserRepo = require('../repositories/userRepository');
class UserService{
  constructor(){}
  async addUser(colList){
    const result = await UserRepo.addUser(colList);
    return result;
  }
  async getUsers(){
    const result = await UserRepo.getUsers();
    return result;
  }
}
module.exports = new UserService();
