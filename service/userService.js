const User = require('../models/User');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

module.exports.createUser = async data => {
  try {
    const newUser = new User({ ...data });
    const res = await newUser.save();
    return res;
  } catch (error) {
    console.log('Fail to create user');
    throw new AppError('Fail to create user', 400);
  }
};

module.exports.getUserById = async ({ id }) => {
  try {
    const data = await User.findById(id);
    return data;
  } catch (error) {
    console.log(`Fail to get user of id ${id}`);
    throw new AppError('Fail to get user', 400);
  }
};

module.exports.getAllUsers = async () => {
  try {
    const data = await User.find();
    return data;
  } catch (error) {
    console.log('Fail to find all users');
    throw new AppError('Fail to get users', 400);
  }
};

module.exports.updateUser = async ({ id, updateInfo }) => {
  try {
    const options = { new: true, runValidators: true };
    const result = await User.findByIdAndUpdate(id, updateInfo, options);
    return result;
  } catch (error) {
    console.log('Fail to update user');
    throw new AppError('Fail to update user', 400);
  }
};

module.exports.deleteUser = async ({ id }) => {
  try {
    const data = await User.findByIdAndDelete(id);
    return data;
  } catch (error) {
    console.log('Fail to delete user');
    throw new AppError('Fail to delete user', 400);
  }
};
