const { User } = require('../models');
const UserRepo = require('../repositories/userRepository');
class UserService{
  constructor(){}
  async addUser(user){
    const result = await UserRepo.addUser(user);
    return result;
  }
  async getUsers(){
    const result = await UserRepo.getUsers();
    return result;
  }
  async updateUser(user){
    console.log('user: ', user);
    const result = await UserRepo.updateUser(user);
    return result;
  }
  async removeUser(id){
    const result = await UserRepo.removeUser(id);
    return result;
  }
}
module.exports = new UserService();
