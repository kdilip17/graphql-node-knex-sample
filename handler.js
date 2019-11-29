const knex = require("./knex");

let external = {};

external.getBooks = (authorid = undefined) => {
    let query = knex("books").select("*");
    if (authorid) {
        query.where({ authorid: authorid })
    }
    return Promise.resolve(
        query.then(rows => {
            return rows
        })
        .catch(error => {
            return error;
        })
    );
}

external.getAuthors = () => {
    let query = knex("authors").select("id", "name", "age")
    return Promise.resolve(
        query.then(rows => {
            return rows
        })
        .catch(error => {
            return error;
        })
    );
}

external.getBookById = (bookId) => {
    return Promise.resolve(
        knex("books").select("id", "name", "genre", "authorid")
        .where({ id: parseInt(bookId) }).debug(false)
        .then(rows => {
            return rows[0]
        })
        .catch(error => {
            return error;
        })
    );
}

external.getAuthorById = (authorId) => {
    return Promise.resolve(
        knex("authors").select("id", "name", "age")
        .where({ id: parseInt(authorId) }).debug(false)
        .then(rows => {
            return rows[0]
        })
        .catch(error => {
            return error;
        })
    );
}

external.addBook = (bookObj) => {
    return Promise.resolve(
        knex("books").insert({
            name: bookObj.name,
            genre: bookObj.genre,
            authorid: bookObj.authorId
        })
        .returning('*')
        .then(rows => {
            return rows[0];
        })
        .catch(error => {
            return error;
        })
    )
}

external.addAuthor = (authorObj) => {
    return Promise.resolve(
        knex("authors").insert({
            name: authorObj.name,
            age: authorObj.age
        })
        .returning('*')
        .then(rows => {
            return rows[0];
        })
        .catch(error => {
            return error;
        })
    )
}

module.exports.usercontroller = external