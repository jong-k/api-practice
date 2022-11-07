const Query = require('./query');
const Mutation = require('./mutation');
const { GraphQLDateTime } = require('graphql-scalars');

module.exports = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime,
};
