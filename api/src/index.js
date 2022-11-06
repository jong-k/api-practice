const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;

// 스키마 구성
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// 스키마 필드를 위한 리졸버 함수 제공
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
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
