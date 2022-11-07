const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError,
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');

module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: 'jong-k', // TODO: 하드코딩된 것 수정
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { content, id }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      { new: true }
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // 이메일 주소 스트링 처리
    email = email.trim().toLowerCase();
    // 비밀번호 해싱
    const hashed = await bcrypt.hash(password, 10);
    // gravatar URL 생성
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      // JWT 생성 및 반환
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      // 이메일 주소 문자열 처리
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });

    // 사용자를 찾지 못하면 인증 에러 발생
    if (!user) throw new AuthenticationError('invalid username');

    // 비밀번호 불일치 시 인증 에러 발생
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AuthenticationError('invalid password');

    // JWT 생성 및 반환
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
