const collection = require("../config/collection");
const db = require("../config/connection");
const bcrypt = require("bcrypt");
module.exports = {
  AddUser: (details) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({
          $or: [{ email: details.email }, { phone: details.phone }],
        })
        .then(async (userData) => {
          if (userData === null) {
            details.password = await bcrypt.hash(details.password, 10);
            db.get()
              .collection(collection.USER_COLLECTION)
              .insertOne(details)
              .then(() => resolve())
              .catch((err) => reject(err));
          } else {
            reject({ message: "User already exist.." });
          }
        })
        .catch((err) => reject(err));
    }),
};
