const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
      // Check if the user does not already exist
      if (!isValid(username)) {
          // Add the new user to the users array
          users.push({"username": username, "password": password});
          return res.status(200).json({message: "User successfully registered. Now you can login"});
      } else {
          return res.status(404).json({message: "User already exists!"});
      }
  }
  // Return error if username or password is missing
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Create promise method
  let booksPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books,null,4));
    }, 5000);
  });

  //Call the promise and wait for it to be resolved
  booksPromise.then((resolution) => {
    console.log("From Promise:\n" + resolution);
    res.send(resolution);
  });

  //res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Extract the isbn parameter from the request URL
  const isbn = req.params.isbn;
  
  // Create promise method
  let booksPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books[isbn]);
    }, 5000);
  });

  //Call the promise and wait for it to be resolved
  booksPromise.then((resolution) => {
    console.log("From Promise:\n" + resolution);
    res.send(resolution);
  });
  
  //res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Extract the author parameter from the request URL
  const author = req.params.author; 
  
  // Create promise method
  let booksPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      // Iterate through 'books' object keys
      for (let key in books) {
        let book = books[key];
        if (book["author"] == author) {
          resolve(book); 
    }}}, 5000);
  });

  //Call the promise and wait for it to be resolved
  booksPromise.then((resolution) => {
    console.log("From Promise:\n" + resolution);
    res.send(resolution);
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // Extract the title parameter from the request URL
  const title = req.params.title; 
  
  // Create promise method
  let booksPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      // Iterate through 'books' object keys
      for (let key in books) {
        let book = books[key];
        if (book["title"] == title) {
          resolve(book); 
    }}}, 5000);
  });

  //Call the promise and wait for it to be resolved
  booksPromise.then((resolution) => {
    console.log("From Promise:\n" + resolution);
    res.send(resolution);
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
