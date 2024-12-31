const { Schema, model } = require("mongoose"); //mongoose needs to be imported everytime interaction with mongodb is done

/* 
    Fields:
    - name
    - email
    - password
    - role
*/
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // unique ensures that the email entered is unique in the database
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = model("User", userSchema);
module.exports = User;
