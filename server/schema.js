const mongo = require('promised-mongo');
// You can use any MONGO_URL here, whether it's locally or on cloud.
// const db = mongo('mongodb://localhost/mydb');
const db = mongo('mongodb://foo:bar@ds043997.mongolab.com:43997/af_php-app-website-romenskyi_roman');
const authorsCollection = db.collection('authors');

import * as _ from 'underscore';

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull
} from 'graphql';

const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a blog post or a comment',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    twitterHandle: {type: GraphQLString}
  })
});

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    authors: {
      type: new GraphQLList(Author),
      resolve: function() {
        return [];
      }
    }
  }
});

// const Mutation = new GraphQLObjectType({
//   name: 'Mutations',
//   fields: {
//     createAuthor: {
//       type: Author,
//       args: {
//         _id: {type: new GraphQLNonNull(GraphQLString)},
//         name: {type: new GraphQLNonNull(GraphQLString)},
//         twitterHandle: {type: GraphQLString}
//       },
//       resolve: function(rootValue, args) {
//         throw new Error('Not Implemented')
//       }
//     }
//   }
// });

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createAuthor: {
      type: Author,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
      },
      resolve: function(rootValue, args) {
        let author = Object.assign({}, args);
        return authorsCollection.insert(author)
          .then(_ => author);
      }
    }
  }
});


const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
