const mockRequest = require('../../testUtils.js/mockRequest');
const mockResponse = require('../../testUtils.js/mockResponse');
const mockNext = require('../../testUtils.js/mockNext');
const usersController = require('../usersController');
const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('usersController', () => {
  describe('postLogin', () => {
    it('No user found', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext();

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => null);

      await usersController.postLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage: 'No user exists for this username, please try again!',
      });
    });

    it("Passwords don't match", async () => {
      const body = {
        username: 'testUser',
        password: 'testPassword',
      };
      const req = mockRequest(body);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword1',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);

      await usersController.postLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({
        errorMessage: "The passwords don't match, please try again!",
      });
    });

    it('Valid user logs in', async () => {
      const body = {
        username: 'testUser',
        password: 'testPassword',
      };
      const req = mockRequest(body);
      const res = mockResponse();
      const next = mockNext();

      const userInfo = {
        _id: 1,
        username: 'testUser',
        password: 'testPassword',
        isTyping: false,
        isOnline: true,
        friends: [],
        messages: [],
      };

      jest.spyOn(UserModel, 'findOne').mockImplementationOnce(() => userInfo);

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);

      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'Valid Token');

      await usersController.postLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        token: 'Valid Token',
        isOnline: true,
      });
    });
  });

  describe('postRegister', () => {
    it('User already exists', () => {});

    it('User successfully registers', () => {});
  });

  it('getUserInfo', () => {});

  describe('postFriend', () => {
    it('Friend has already been added', () => {});

    it('Friend was successfully added', () => {});
  });

  describe('deleteFriend', () => {
    it("Friend hasn't been added", () => {});

    it('Friend is successfully deleted', () => {});
  });

  it('postMessage', () => {});

  it('getAllUsers', () => {});
});
