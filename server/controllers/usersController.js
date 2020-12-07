const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');

exports.postLogin = async (req, res, next) => {};

exports.postRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (await UserModel.findOne({ username })) {
      return res.status(401).send({
        errorMessage:
          'This user already exists, please try a different username!',
      });
    }

    const encryptedPassword = bcrypt.hash(password, 10);

    const userInfo = await UserModel.create({
      username,
      password: encryptedPassword,
    });

    // encrypt JWT and send it, will revisit model for sending tomorrow

    return res.status(200).send({ ...userInfo });
  } catch (error) {
    return res.status(403).send({
      errorMessage: 'There was an issue with registering, please try again!',
    });
  }
};

exports.getProfile = async (req, res, next) => {
  const id = req.params.id;
};

exports.putProfile = async (req, res, next) => {
  const id = req.params.id;
};

exports.deleteFriend = async (req, res, next) => {
  const id = req.params.id;
};

exports.postFriend = async (req, res, next) => {};

exports.getMessages = async (req, res, next) => {};

exports.postMessage = async (req, res, next) => {};
