import * as _ from 'underscore';

// This is the Dataset in our blog
import PostsList from './data/posts';
import AuthorsList from './data/authors';
import {CommentList, ReplyList} from './data/comments';

import {
  // These are the basic GraphQL types
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,

  // This is used to create required fileds and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema,
} from 'graphql';

/**
  DEFINE YOUR TYPES HERE
**/

// This is the Root Query
const Query = new GraphQLObjectType({
  name: 'BlogQueries',
  description: "Root of the Blog Schema",
  fields: () => ({
    echo: {
      type: GraphQLString,
      description: "Echo what you enter",
      args: {
        message: {type: GraphQLString}
      },
      resolve: function(source, {message}) {
        return `recieved ${message}`;
      }
    }
  })
});

// This the Schema
const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;