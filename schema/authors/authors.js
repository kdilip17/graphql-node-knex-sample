const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;
const userController = require('../../handler').usercontroller;

module.exports = new GraphQLObjectType({
    name: 'Author',
    fields: () => {
        const BookType = require("../books/book")
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
            books: {
                type: new GraphQLList(BookType),
                async resolve(parent, args) {
                    return await userController.getBooks(parent.id)
                }
            }
        }
    }

})