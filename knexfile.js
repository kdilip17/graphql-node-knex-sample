// Update with your config settings.
let postgresURL = process.env.postgresURL
var options = {
    development: {
        client: 'pg',
        connection: postgresURL,
        debug: false
    }
};
module.exports = options;

// users: () => {
//     userController.getUserList(function(err, result) {
//         if (!err) {
//             let output = [...result]
//             console.log(output)
//             return usersList;
//         } else {
//             return err;
//         }
//     })
// },
// createUser: (args) => {
//     let userInpt = args.userInput
//     userController.addUser(userInpt, function(err, result) {
//         if (!err) {
//             console.log(result[0])
//             return result[0];
//         } else {
//             return err;
//         }
//     })
// }