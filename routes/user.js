const express = require("express");
// set up the order router
const router = express.Router();

// import the functions from controllers
const { login, signup } = require("../controllers/user");

/*
    2 routes:
    POST /login
    POST /signup
*/

// login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // loginn user via login function
    const user = await login(email, password);

  // send back the user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// signup
router.post("/signup", async (req, res) => {
  try {
    // assigning constant variables from the JSON body from the request
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //create new user via signup function
    const user = await signup(name, email, password);

    // send back the newly created user data
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;
