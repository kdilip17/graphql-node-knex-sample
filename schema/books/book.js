const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;
const AuthorType = require("../authors/authors")
const userController = require('../../handler').usercontroller;

module.exports = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                let author = await userController.getAuthorById(parent.authorid)
                return author;
            }
        }
    })
})