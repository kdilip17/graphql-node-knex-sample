const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql")

const userController = require('./handler').usercontroller;


var usersList = [{
        "id": 1,
        "name": "afassfa@",
        "email": "dsa"
    },
    {
        "id": 2,
        "name": "kumar1",
        "email": "kumar1@gm.com"
    },
    {
        "id": 3,
        "name": "kumar1",
        "email": "kumar1@gm.com"
    },
    {
        "id": 4,
        "name": "kumar1",
        "email": "kumar1@gm.com"
    },
    {
        "id": 5,
        "name": "kumar1",
        "email": "kumar1@gm.com"
    }
]

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.send('Success');
})

app.use('/graphql',
    graphqlHttp({
        schema: buildSchema(`
            type User {
                id: Int!
                name: String!
                email: String!
            }

            input UserInput {
                name: String!
                email: String!
            }

            type RootQuery {
                users: [User!]!
            }

            type RootMutation {
                createUser(userInput: UserInput): User
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            users: () => {
                // userController.getUserList(function(err, result) {
                //     if (!err) {
                //         let output = result.map(user => {
                //             return {
                //                 id: parseInt(user.id),
                //                 name: user.name.toString(),
                //                 email: user.email.toString()
                //             }
                //         })
                //         return output;
                //     } else {
                //         return err;
                //     }
                // })
                return usersList;
            },
            createUser: (args) => {
                let userInpt = args.userInput
                    // userController.addUser(userInpt, function(err, result) {
                    //         if (!err) {
                    //             let output = result.map(user => {
                    //                 return {
                    //                     id: parseInt(user.id),
                    //                     name: user.name.toString(),
                    //                     email: user.email.toString()
                    //                 }
                    //             })
                    //             console.log(output[0])
                    //             return output[0];
                    //         } else {
                    //             return err;
                    //         }
                    //     })
                    // console.log(result)
                let user = {
                    id: Number(Math.floor(Math.random() * (999 - 100 + 1) + 100)),
                    name: userInpt.name ? userInpt.name : 'fdsa',
                    email: userInpt.email ? userInpt.email : 'dsfafds@gsd'
                }
                usersList.push(user)
                console.log(usersList)
                return user;
            }
        },
        graphiql: true
    }))

function clear(params) {
    process.stdout.write("\033c")
}
clear();
app.listen(3001, () => console.log('App listening on port 3001!'));