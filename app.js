const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const schema = require("./schema/schema")
    // cross origin included
const cors = require('cors')

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
// cross orgin
app.use(cors());
app.get("/", (req, res, next) => {
    res.send('Success');
})

app.use('/graphql',
    graphqlHttp({
        schema,
        graphiql: true
    }))

function clear(params) {
    process.stdout.write("\033c")
}
clear();
// console.log(process.env.mongoconnectURL)
// console.log(process.env.mongoURL)

// mongoose.connect(process.env.mongoconnectURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log("Connected to Database");
// }).catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
// });
// mongoose.connect(process.env.mongoURL, { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', (error) => {
//     console.log(error)
// });
// db.once('open', function() {
//     console.log("connected")
// });

app.listen(3001, () => console.log('App listening on port 3001!'));