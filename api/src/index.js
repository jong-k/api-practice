const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
db.connect(DB_HOST);

// JWT에서 사용자 정보 가져오기
const getUser = (token) => {
  if (token) {
    try {
      // 토큰에서 얻은 사용자 정보 반환
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // 헤더에서 사용자 토큰 가져오기
    const token = req.headers.authorization;
    // 토큰에서 사용자 얻기
    const user = getUser(token);
    console.log(user);
    // context에 db models 및 user 추가
    return { models, user };
  },
});
// 여기
server.start().then((res) => {
  const app = express();
  // 아폴로 그래프QL 미들웨어를 적용하고 경로를 /api로 설정
  server.applyMiddleware({ app, path: '/api' });
  app.listen({ port }, () =>
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
  );
});
