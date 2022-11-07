const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;

// 더미 데이터
let notes = [
  { id: '1', content: 'This is a note', author: 'Elon Musk' },
  { id: '2', content: 'This is another note', author: 'Jack Dorsey' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Tim Cook' },
];

// 스키마 구성
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
  }
`;

// 스키마 필드를 위한 리졸버 함수 제공
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: args.content,
      };
      notes.push(noteValue);
      return noteValue;
    },
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
