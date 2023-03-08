const collection = require("../config/collection");
const db = require("../config/connection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
module.exports = {
  loginUser: (details) =>
    new Promise((resolve, reject) => {
      let response = {};
      // login database call
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ phone: details.phone })
        .then((user) => {
          if (user != null) {
            bcrypt
              .compare(details.password, user.password)
              .then((status) => {
                if (status) {
                  response.userId = user._id;
                  response.username = user.firstName;
                  response.email = user.email;
                  resolve(response);
                } else {
                  // incorrect password
                  reject({ message: "Password incorrect", status: 401 });
                }
              })
              .catch((err) => reject(err));
          } else {
            // user not found..
            reject({ message: "No user found..", status: 404 });
          }
        })
        .catch((err) => reject(err));
    }),
  findUserById: (Id) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: ObjectId(Id) })
        .then((user) => {resolve(user)})
        .catch((err) => reject(err));
    }),
};
