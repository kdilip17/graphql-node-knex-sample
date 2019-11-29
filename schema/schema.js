const graphql = require("graphql");
const _ = require("lodash")
const userController = require('../handler').usercontroller;
// const fromSnakeCase = require("../utils/util")
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const BookType = require("./books/book")
const AuthorType = require("./authors/authors")

// var books = [
//     { name: 'new', genre: 'test', id: "1", authorId: "1" },
//     { name: 'new2', genre: 'test', id: "2", authorId: "3" },
//     { name: 'new3', genre: 'test', id: "3", authorId: "2" },
//     { name: 'new4', genre: 'test', id: "4", authorId: "1" },
//     { name: 'new5', genre: 'test', id: "5", authorId: "3" },
//     { name: 'new6', genre: 'test', id: "6", authorId: "2" }
// ]

// var authors = [
//     { name: 'Patrick', age: 44, id: '1' },
//     { name: 'Brandon', age: 42, id: '2' },
//     { name: 'Terry', age: 45, id: '3' }
// ]

// const BookType1 = new GraphQLObjectType({
//     name: 'Book',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         author: {
//             type: AuthorType,
//             async resolve(parent, args) {
//                 let author = await userController.getAuthorById(parent.authorid)
//                 return author;
//             }
//         }
//     })
// })

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         books: {
//             type: new GraphQLList(BookType),
//             async resolve(parent, args) {
//                 return await userController.getBooks(parent.id)
//             }
//         }
//     })
// })

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args) {
                return await userController.getAuthors()
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                return await userController.getBooks()
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                // code to get data from db/other source
                return await userController.getAuthorById(args.id)
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                // code to get data from db/other source
                return await userController.getBookById(args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            async resolve(parent, args) {
                let name = args.name,
                    age = args.age,
                    author = { name, age }
                return await userController.addAuthor(author);
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                let name = args.name,
                    genre = args.genre,
                    authorId = args.authorId,
                    book = { name, genre, authorId }
                return await userController.addBook(book);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})